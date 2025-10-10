import { useEffect, useRef, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCards';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom'
import { useCustomFetch } from '../hooks/useCustomFetch';
import Slider from 'react-slick'; // react-slick 사용을 위해 import
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slickRef = useRef<Slider | null>(null);


  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0px",
  arrows: true, 
  beforeChange: (_: number, next: number) => setCurrentIndex(next),
};


  const { category } = useParams<{
    category :  string
  }>();

  
const { data, isLoading, isError } = useCustomFetch<MovieResponse>({ 
  type : 'category', 
  category, 
  page,
 });

 useEffect(()=>{
  if(data){
    setMovies(data.results);
    console.log(data.results)
  }
 }, [data]);
  
  if (isError) {
    return (
    <div> 
      <span>에러발생</span> 
    </div>)
  }

  return (
    <div className='flex flex-col gap-6'>

    {isLoading && (
      <div className='flex items-center justify-center h-dvh'>
      <LoadingSpinner />
      </div>
    )}
    {!isLoading && (
    <div className='p-10 mx-[200px] bg-gradient-to-b from-[#ffffff] to-[#ebebeb] h-screen'>
   <Slider {...settings} ref={slickRef} >
            {movies?.map((movie, index) => (
              <div
                key={movie.id}
                className={`transition-transform duration-300 ease-in-out px-2 rounded-2xl  ${
                  index === currentIndex ? "scale-100 z-10" : "scale-90 opacity-70"
                }`}
              >
                <MovieCard movie={movie} />
                <h2 className="text-lg font-bold text-center leading-snug mt-[10px]">{movie.title}</h2>
                <h2 className="text-[12px] text-[#434343] font-medium text-center leading-snug mt-[2px] mb-[14px]">{movie.original_title}</h2>
                <div className="flex justify-center">
                    <button className="text-[14px] py-[5px] px-[20px] border border-[#b9b9b9] rounded-2xl bg-white cursor-pointer">
                      예매하기
                    </button>
                </div>              
                </div>
            ))}
          </Slider>
    </div>
    )}

    </div>
  );
};

export default MoviesPage;