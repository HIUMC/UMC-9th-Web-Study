import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?:boolean;// 요청 재시도 여부를 나타내는 플래그
}


// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다
let refreshPromise:Promise<string>|null=null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
  Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
 },
})


// 요청 인터셉터 : 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
axiosInstance.interceptors.request.use((config) => {
  const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();

  if(accessToken){
   config.headers=config.headers||{};
   config.headers.Authorization=`Bearer ${accessToken}`;
  }

  return config;
},(error)=>Promise.reject(error),
);

// 응답 인터셉터 :  401 에러 발생 -> refresh 토큰을 통한 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response)=>response,//정상응답 그대로 반환
  async(error)=>{
    const originalRequest:CustomInternalAxiosRequestConfig = error.config;

    if(error.response &&
       error.response.status === 401 &&
        !originalRequest._retry
      ){
      if(originalRequest.url==='/v1/auth/refresh'){
        const {removeItem: removeAccessToken} = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken,
        );
        const{removeItem:removeRefreshToken}=useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken,
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href="/login";
        return Promise.reject(error);
      }
        // 재시도 플래그 설정
        originalRequest._retry = true;

        // 이미 리프레시 요청이 진행 중이면, 그 Promise를 재사용함.
        if(!refreshPromise){
          refreshPromise = (async()=> {
            const{ getItem: getRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            );
            const refreshToken= getRefreshToken();

            const {data} = await axiosInstance.post("/v1/auth/refresh",{
              refresh:refreshToken,
            });

            // 새 토큰이 반환
            const {setItem: setAccessToken}=useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            )

            const{setItem: setRefreshToken}=useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            )

            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);

            return data.data.accessToken;
          }
        )()
          .catch((error) => {
            const {removeItem:removeAccessToken}=useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            )
            const {removeItem:removeRefreshToken}=useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            );
            removeAccessToken();
            removeRefreshToken();
            console.log(error)
          })
          .finally(()=>{
            refreshPromise = null;
          })
        }

        // 진행 중인 refreshPromise가 해결될 때까지 기다림
        return refreshPromise?.then((newAccessToken)=>{
          originalRequest.headers["Authorization"]=`Bearer ${newAccessToken}`;
          // 업데이트 된 원본 요청을 재시도함
          return axiosInstance.request(originalRequest);
        })
      }

      // 401에러가 아닌 경우 그대로 오류 반환
      return Promise.reject(error);
    },
)