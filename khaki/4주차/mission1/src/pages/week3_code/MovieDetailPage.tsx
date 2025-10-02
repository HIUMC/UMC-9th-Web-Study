import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { type MovieDetailWithCredits } from "../types/movieDetail";
import LoadingSpinner from "../components/LoadingSpinner";
import PeopleCard from "../components/PeopleCard";

const MovieDetailPage = () => {
  // useParams 값은 항상 문자열 | undefined이다. 숫자 id가 필요하면 변환+검증을 해야한다.
  const {movieId} = useParams<{movieId : string}>();
  // 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 에러 상태
  const [isError, setIsError] = useState(false);
  // 영화 상세정보
  const [data, setData] = useState<MovieDetailWithCredits|null>(null)

  useEffect(():void => {
    const fetchDetails = async () => {
        // 여기서 제네릭 <MovieDetail>은 응답 본문의(data)의 타입을 지정하는 것이다
        // 원하는 필드만 넣으면 그 필드로만 타입이 지정되어 자동완성/타입체크 가능
        // 구조분해할당 유무로 api에서 주는 객체의 형태가 다르진 않다.
        try{
          setIsError(false);
          setIsPending(true);

          const {data} = await axios.get<MovieDetailWithCredits>(`https://api.themoviedb.org/3/movie/${movieId}`, 
          {
            params: {
              language:'ko-KR',
              append_to_response:'credits',
            },
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // <- v4 토큰
            }
          })
          console.log('detail:', data);
          // 제네릭으로 저 타입을 지정해줘도 이는 그 타입으로 가정해"라고 알려주는 것이지 실제로는 원본을 다 가져오므로 console.log에도 원본의 필드들이 보임
          setData(data);
        }
        catch{
          setIsError(true);
        }
        finally{
          setIsPending(false);
        }
        
        
      }
    fetchDetails();
    
    
  },[movieId])
  
  if(isError)
  {
    return(
    <div>
      <span className="text-red-500 text-2xl">에러가 발생!!</span>
    </div>
    )
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )}
      
      {!isPending && (
        <main className="bg-black min-h-screen">
          <div className="p-4 h-screen grid grid-rows-2 gap-4">
            <div
            className="text-white bg-cover bg-center rounded-xl p-2 grid grid-cols-5"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500${data?.poster_path})`,
              // axios를 통해 data 안에 들어있는 poster_path는 이미지의 상대경로이다. 따라서 실제 이미지를 보려면 위와 같이 TMDB의 이미지 CDN 도메인에 앞의 경로를 붙여야 한다.
              // backgroundSize: "cover", -> 배경 이미지의 크기를 어떻게 맞출지
              // backgroundPosition: "center" ->  배경 이미지를 요소 안에서 어디에 위치시킬지 결정
          
            }}
            >
              <div className="col-span-2">
                <h1 className="text-3xl font-bold">{data?.title}</h1>
                <p className="mt-2 text-sm">
                  평균 {data?.vote_average}
                  <br></br>
                  {data?.release_date.slice(0,4)}
                  <br></br>
                  {data?.runtime}분
                </p>
                <p className="mt-2 text-lg italic">{data?.tagline}</p>
                <p className="mt-3 line-clamp-5">{data?.overview}</p>
              </div>
              <div className="col-span-3"></div>
            </div>
            <div className="bg-transparent p-2 min-h-0 overflow-y-auto">
              <h2 className="text-3xl text-white font-bold ">감독/출연</h2>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {data?.credits.cast.map((casts) => <PeopleCard key={`cast-${casts.id}`} photo={casts.profile_path} name={casts.name} character={casts.character}/>)
                }
                {data?.credits.crew.map((crew) => <PeopleCard key={`crew-${crew.id}`} photo={crew.profile_path} name={crew.name} character={crew.job}/>)
                }
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}


export default MovieDetailPage


/*
const {data} = await axios.get<MovieDetail>를 했을 때 응답받는 객체의 형태

1. 최종반환 : AxiosResponse<MovieDetail>
2. 구조: 
type AxiosResponse<T> = {
  data: T;                 // ← 서버가 준 "응답 본문"(파싱된 JSON)
  status: number;          // 200, 404 등 HTTP 상태 코드
  statusText: string;      // "OK" 등 상태 문자열
  headers: any;            // 응답 헤더들
  config: any;             // 이 요청에 사용된 설정(요청 URL/메서드/헤더 등)
  request?: any;           // 어댑터가 사용한 실제 요청 객체(XHR 등, 환경별 상이)
}

AxiosResponse<MovieDetail>
├─ data: MovieDetail      ← 우리가 가장 많이 쓰는 부분
├─ status: 200
├─ statusText: "OK"
├─ headers: { ... }
├─ config: { url, method, headers, baseURL?, params?, data?, ... }
└─ request: ... (환경에 따라 존재)
*/