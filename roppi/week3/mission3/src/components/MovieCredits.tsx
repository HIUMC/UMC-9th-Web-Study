// MovieCredits.tsx
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    const fetchCredits = async () => {
      setIsPending(true);

      try {
        const { data } = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        // 배우
        setCast(data.cast);

        // 감독 (crew 중 department이 Directing 이고, job이 Director 인 경우)
        setDirectors(
          data.crew.filter((person) => person.department === "Directing")
        );
        console.log(data.crew)
      } catch (err) {
        console.error("Error fetching credits:", err);
        setIsError(true);
      }
      finally{
        setIsPending(false);
      }
    };

    if (movieId) fetchCredits();
  }, [movieId]);
    

  if (isError) {
    return (
    <div> 
      <span>에러발생</span> 
    </div>)
  }

  return (
    <>
   {!isPending && (
     <div className="p-6">
       {/* 감독 */}
       <h2 className="text-xl font-bold mb-3">🎬 감독</h2>
       <div className="flex gap-4 overflow-x-auto">
         {directors.map((director) => (
           <div key={director.id} className="w-40 text-center">
             <img
               className="w-32 h-44 object-cover rounded-lg mx-auto"
               src={
                 director.profile_path
                   ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                   : "https://via.placeholder.com/200x300?text=No+Image"
               }
               alt={director.name}
             />
             <p className="mt-2 font-semibold">{director.name}</p>
           </div>
         ))}
       </div>
 
       {/* 배우 */}
       <h2 className="text-xl font-bold mt-6 mb-3">🎭 출연 배우</h2>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
         {cast.slice(0, 10).map((actor) => (
           <div key={actor.id} className="text-center">
             <img
               className="w-32 h-44 object-cover rounded-lg mx-auto"
               src={
                 actor.profile_path
                   ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                   : "https://via.placeholder.com/200x300?text=No+Image"
               }
               alt={actor.name}
             />
             <p className="mt-2 font-semibold">{actor.name}</p>
             <p className="text-sm text-gray-400">{actor.character}</p>
           </div>
         ))}
       </div>
     </div>
    )}
    {isPending && (
      <>
    감독 및  배우 정보 불러오는중..
    </>
    )}
    </>
  );
}; export default MovieCredits
