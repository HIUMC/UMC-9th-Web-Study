import { useState } from "react";
import type { Movie } from "../types/movie"

// 이 컴포넌트가 받을 props 형태 지정
interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({movie}:MovieCardProps) {

  // isHovered : 마우스를 카드위에 올려놨는가? -> 초기값 : false
  const [isHovered, setIsHovered] = useState(false);

  // 1) 카드 컨테이너 div
  //    - 영화 설명 부분(absolute)이 div를 기준으로 배치되도록
  //    - onMouseEnter(마우스를 올리면) : isHovered=true
  //    - onMouseLeate(마우스가 떠나면) : isHovered=false
  // 2) 영화 포스터 이미지
  //    - 이미지 링크는 poster_path
  //    +) 상세페이지 만들 땐 backdrop_path 가져오면 될까..
  // 3) hover시 바뀌는
  //    - {isHovered && (...)} : 조건부 렌더링
  //     -> 마우스를 올렸을 떄만 보이도록
  //    - absolute : div 컨테이너를 벗어나지 않도록
  //    - <h2> : 영화 제목
  //    - <p> : 영화 줄거리
  return( 
  <div 
    className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105" 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img 
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
      alt={`${movie.title}의 이미지`}    
      className=""
    />

    {isHovered && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/50
       to-transparent backdrop-blur-md flex flex-col justify-center items-center p-4 text-white">
        <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
      </div>
    )}
  </div>
  );
}

// 🌸🌸tailwind css🌸🌸

// 1) div 컨테이너
//"relative : 이 요소를 상대적 위치 기준으로 설정
// rounded-xl : 모서리 둥글게 대왕 동글
// shadow-lg : 요소에 큰 그림자 추가
// overflow-hidden : 자식 요소가 부모영역 벗어나면 잘라냄
// cursor-pointer : 커서모양 포인터로
// w-44 : 요소 너비 고정
// transition-transform : 변화가 부드럽게 바뀌도록 
// duration-500 : transition 시간을 0.5초(500ms)로 설정
// hover:scale-105" ; 마우스 올리면 살짝(105%) 확대되게

// 2) isHovered <div> - 컨테이너
// "absolute : 부모박스(relative) 기준으로 위치가 잡힘
// inset-0 : 부모의 전체 영역 꽉 채움
// bg-gradient-to-t from-black/50 to-transparent : 배경을 아래에서 위로 향하는 그라데이션/ 시작색/ 끝색
// backdrop-blur-md : 중간정도 블러처리
// flex flex-col justify-center item-center : flex 중앙 정렬 
// p-4 : 패딩 4
// text-white" : 글씨 흰색

// 3) isHovered <h2> - 영화 제목
// "text-lg : 큰 글씨 
// font-bold : 두꺼운 글씨
// leading-snug" : 줄간격 살짝 좁게

// 4) isHovered <p> - 줄거리 요약
// leading-relaxed : 줄간격 여유있게
// mt-2 : margin-top
// line-clamp-5" : 텍스트를 최대 5줄까지만 표시
