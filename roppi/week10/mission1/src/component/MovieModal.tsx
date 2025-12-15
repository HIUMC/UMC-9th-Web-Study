import { createPortal } from "react-dom";
import type { Movie } from "../types/movie";
import { useState, useEffect } from "react";
import PopularityBar from "./PopularityBar";
import imdb from '../assets/imdb.png';

interface MovieModalProps {
  movie: Movie;
  setMovieModal: (isOpen: boolean) => void;
}

export default function MovieModal({ movie, setMovieModal }: MovieModalProps) {
  const moviePath = 'https://image.tmdb.org/t/p/w500';

  // 평점
  const voteAverage = movie.vote_average.toFixed(1); 

  // 인기도
  const [barScale, setBarScale] = useState(0);
  const popularityPercent = Math.min(
  (movie.popularity / 500) * 100,
  100
  );
  useEffect(() => {
    requestAnimationFrame(() => {
      setBarScale(popularityPercent / 100);
    });
  }, [popularityPercent]);

  // 개봉일
  const [year, momth, date] = movie.release_date.split('-');
  const releaseDate = `${year}년 ${momth}월 ${date}일`;

  // imdb 검색 
  // 영화 제목에 공백/특수문자가 포함될 수 있으므로 encodeURIComponent로 인코딩 필요
  // 주의!! 새 탭 : window.open , 현재 탭 : window.location.href
  const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
  const handleImdbSearch = () => {
    window.open(imdbSearchUrl, "_blank", "noopener,noreferrer");
  };



  return createPortal(
    <div
      onClick={() => setMovieModal(false)}
      className="fixed inset-0 w-full h-full flex items-center justify-center 
                 bg-[#000000]/60 backdrop-blur-sm p-[10px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-white w-[calc(100%-500px)] min-w-[300px] mx-[250px] min-h-[700px] text-2xl bg-[#ffffff] rounded-2xl overflow-hidden"
      >

        <div className="w-full flex items-center justify-center mb-[10px] relative">
          <div className="relative w-full">
            <img className='border z-0 w-full h-[200px] object-cover border-gray-500 transition duration-300' src={moviePath + movie.poster_path} alt={movie.title} />
                  {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black/30" />
          </div> 
            <div className="absolute bottom-3 left-[20px] text-[#ffffff]">
            <p className="font-bold">{movie.title}</p>
            <p className="font-light text-[15px]">{movie.original_title}</p>
            </div>
        </div>

        <div className="mx-[15px] w-[calc(100%-30x)] flex flex-col gap-5">

          <div className="flex w-full gap-5">
            <img className='z-0 w-[40%] max-h-[300px] object-contain border-gray-500 rounded-3xl' src={moviePath + movie.poster_path} alt={movie.title} />            
            <div className="w-full text-black text-[15px]">
              <span>{voteAverage}</span>
              <span className="ml-2 text-[8px] text-[#a2a2a2]">{movie.vote_count}명 참여</span>

              <div className="w-full flex flex-col gap-1 mt-[20px]" >
                  <div>
                    <p className="text-sm font-black">개봉일</p>
                    <p className="text-[10px] font-medium text-[#4d4d4d]">{releaseDate}</p>
                  </div>
                  <div className="mt-2 pr-2">                  
                    <p className="text-sm font-black">인기도</p>                                
                    <PopularityBar popularity={movie.popularity} barScale={barScale}/>
                  </div>
              </div>
            </div>
          </div>
        
          <div className="text-black text-[15px] text-center">
            <p className="font-black">줄거리</p>
            <p>{movie.overview || "아직 등록되지 않았습니다."}</p>
          </div>

                  <div className="flex justify-end gap-2 text-black">
                    <div
                      onClick={handleImdbSearch}
                      className=" border rounded p-2 cursor-pointer hover:bg-[#fec919] flex items-center">
                      <img className="w-[20px] inline-block mr-2 rounded" src={imdb} alt="imdb" />
                      <span className="text-[15px]">IMDb에서 검색</span>
                    </div>
                    <button  
                      onClick={() => setMovieModal(false)}
                      className="border rounded p-2 cursor-pointer hover:bg-[#000000] hover:text-[#ffffff] flex">
                      <span className="text-[15px]">닫기</span>
                    </button>
                  </div>

        </div>
      

        <p className="mt-2">내용 테스트</p>
      </div>
    </div>,
    document.body
  );
}
