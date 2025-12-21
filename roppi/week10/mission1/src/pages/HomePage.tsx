import { useCallback, useEffect, useRef, useState } from "react";
import FilterBtn from "../component/FilterBtn";
import MovieInput from "../component/MovieInput";
import FilterOption from "../component/FilterOption";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../component/Moviecard";
import MovieModal from "../component/MovieModal";

const Home = () => {
  // 영화 데이터 상태 관리
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  
  // 모달 상태 관리
  const [filterModal, setFilterModal] = useState(false);
  const [movieModal, setMovieModal] = useState(false);

  // 검색어 및 필터 옵션 상태 관리
  const [query, setQuery] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [language, setLanguage] = useState("ko-KR");
  const showMovies = movies.length > 0 && query.length > 0 ? filteredMovies : movies


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setFilteredMovies(movies);
      return;
    }
    
    const keyword =  query.toLowerCase();
    const searchMovie = movies.filter((movie) => movie.title.toLowerCase().includes(keyword));
    setFilteredMovies(searchMovie);
    console.log(movies)
    console.log(filteredMovies)
  } 
  

  // GET: 영화 데이터
  useEffect(() => {
    const fetchMovies = async (): Promise<void> => {
      if (isLoading || !hasMore) return;
      

      setIsLoading(true);

      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=${language}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      let newMovies = data.results;

      // 성인 필터
      if (!isAdult) {
        newMovies = newMovies.filter(movie => !movie.adult);
      }

      setMovies(prev => {
      const map = new Map<number, Movie>();
      [...(page === 1 ? [] : prev), ...newMovies].forEach(movie => {
        map.set(movie.id, movie);
      });
      return Array.from(map.values());
    });

      // 마지막 페이지면 더 이상 요청 안 함
      if (data.page >= data.total_pages) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    fetchMovies();
  }, [page, language, isAdult]);


  useEffect(() => {
    const handleScroll = () => {
      if (isLoading || !hasMore) return;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 바닥에서 200px 남았을 때
      if (scrollTop + windowHeight >= documentHeight - 200) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  
      // 모달 내부를 눌렀을 때 모달이 꺼지는 것을 방지
    // const preventOffModal = (event: React.MouseEvent) => {
    //   event.stopPropagation();
    // };
    
    // 모달이 뜬 상태에서는 뒷 화면 스크롤 방지
    useEffect(() => {
      if (filterModal || movieModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [filterModal, movieModal]);


  // useCallback으로 최적화
  const handleMovieClick = useCallback((movie : Movie) => {
    setSelectedMovie(movie);
    setMovieModal(true);
  }, []);


  return (
    <>
      {filterModal && <FilterOption setFilterModal={setFilterModal} isAdult={isAdult} setIsAdult={setIsAdult} language={language} setLanguage={setLanguage}/>}
      <form 
        onSubmit={handleSearch}
        className="min-h-[84px] mt-[10px] bg-[#f5f5f5] p-[10px] rounded-lg
        ">
          <div className="flex justify-end items-center gap-[40px]">

            <MovieInput value={query} setQuery={setQuery}/>
            <div className="flex flex-col gap-[3px]">

            <FilterBtn setFilterModal={setFilterModal} /> 
            <button 
              type="submit"
              className="border-none bg-[#ffffff] p-[10px] cursor-pointer hover:bg-[black] hover:text-[#ffffff]"
                >SEARCH</button>
              </div>

          </div>
        
      </form>

        {/* 반응형 영화 카드 리스트 */}
        <ul className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-5
          gap-4
          ">   
         {showMovies?.map((movie)  => (
              <MovieCard key={movie.id} movie={movie}
              onClick={handleMovieClick}
              />
            ))}
        </ul>
      
        {movieModal && selectedMovie && (

          <div className="absolute top-0 left-0 w-full h-full">
            <MovieModal
              movie={selectedMovie}
              setMovieModal={setMovieModal}
            />
          </div>
            )}

    </>
  )
} 
export default Home;




// 문제 상황은 스크롤 하며 page가 증가 할때마다 movie 배열에 동일한 prev가 쌓이는 것
// page = 1 에서는 문제 없음
// -> 스크롤 할 때마다 fetch한 페이지가 중복해서 fetch되는 문제!
