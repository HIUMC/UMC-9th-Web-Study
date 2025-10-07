// MovieCredits.tsx
import { useEffect, useState } from "react";
import { useCustomFetch } from "../hooks/useCustomFetch";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./Arrow";


interface Person {
  id: number;
  name: string;
  gender: number;
  known_for_department: string;
  character?: string; // 배우인 경우만 있음
  profile_path: string | null;
  department: string;
}

interface CreditsResponse {
  cast: Person[];
  crew: Person[];
}

const MovieCredits = ({ movieId }: { movieId: number }) => {
  // cast, directors 상태 + fetch 로직
  const [cast, setCast] = useState<Person[]>([]);
  const [directors, setDirectors] = useState<Person[]>([]);
  const combined = [...directors, ...cast];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };




  const { data, isLoading, isError} = useCustomFetch<CreditsResponse>({
    type: 'credits',
    movieId,
  })

  useEffect(()=>{
    if(data?.cast){
      setCast(data?.cast);
    }
    if(data?.crew){
      // 감독 (crew 중 department이 Directing 이고, job이 Director 인 경우)

      setDirectors(
       data.crew.filter((person) => person.department === "Directing")
      )
}
  },[data])

  if (isError) {
    return (
    <div> 
      <span>에러발생</span> 
    </div>)
  }

  return (
    <>
    {!isLoading && combined.length > 0 && (
        <div className="p-6 rounded-t-2xl bg-white">
          <h2 className="text-xl font-bold mb-3">감독 & 배우</h2>
          <Slider {...settings}>
            {combined.map((person) => (
              <div key={person.id} className="text-center px-2">
                <img
                  className="w-32 h-44 object-cover rounded-lg mx-auto"
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={person.name}
                />
                <p className="mt-2 font-semibold">{person.name}</p>
                <p className="text-sm text-gray-400">{person.character || person.department}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}


    {isLoading && (
      <>
    감독 및  배우 정보 불러오는중..
    </>
    )}
    </>
  );
}; export default MovieCredits
