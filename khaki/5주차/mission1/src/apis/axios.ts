// <axios 라이브러리를 커스텀해서 만든 전용 요청도우미 객체>
import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key';


export const axiosInstance = axios.create( 
  //axios 인스턴스를 만듬, 이 안에서 모든 요청이 공통적으로 쓸 설정을 지정
  {  
  // 모든 요청의 기본 주소를 지정(.env 파일에 정의된 환경변수로 불러옴)
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  
  // 모든 요청의 공통헤더를 지정하는 부분(지금 같은 경우는 localStorage의 accessToken을 꺼내서 모든 api요청의 헤더에 자동으로 포함시켜준다.)
  headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },

});

