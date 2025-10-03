import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movie";
import axios from "axios";
import type { Credit, CreditsResponse } from "../types/credit";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMsg } from "../components/ErrorMsg";
import { MovieHeader } from "../components/MovieHeader";
import { CastAndCrew } from "../components/CastAndCrew";

const MovieDetailPage = () => {
  const [details, setDetails] = useState<MovieDetails>();
  const [credits, setCredits] = useState<Credit[]>([]);

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const { movieId } = useParams<{
    movieId: string;
  }>();

  useEffect(() => {
    if(!movieId) return;

    const fetchMovieDetails = async (): Promise<void> => {
      setIsPending(true);
      setIsError(false)
      try {
        const { data: movieDetails } = await axios.get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
        ,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        });
        const { data: creditsData } = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
        ,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        })
        setDetails(movieDetails)
        setCredits([...creditsData.cast, ...creditsData.crew])
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    }
    fetchMovieDetails()
  }, [movieId])

  const casts = credits.filter((credit) => credit.known_for_department === "Acting")
  const crews = credits.filter((credit) => credit.job !== undefined)

  if(isError) {
    return (
      <div>
        <ErrorMsg/>
      </div>
    )
  }

  if(isPending || !details) {
    return (
      <>
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="p-6 bg-black">
        <MovieHeader details={details} />
        <CastAndCrew casts={casts} crews={crews} />
      </div>
    </>
  )
}

export default MovieDetailPage