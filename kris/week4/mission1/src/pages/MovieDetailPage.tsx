import { useParams } from "react-router-dom";
import type { MovieDetails } from "../types/movie";
import type { CreditsResponse } from "../types/credit";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMsg } from "../components/ErrorMsg";
import { MovieHeader } from "../components/MovieHeader";
import { CastAndCrew } from "../components/CastAndCrew";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{
    movieId: string;
  }>();

  const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`

  const {data: detailsData, isPending: isDetailsPending, isError: isDetailsError} = useCustomFetch<MovieDetails>(detailsUrl)

  const {data: creditsData, isPending: isCreditsPending, isError: isCreditsError} = useCustomFetch<CreditsResponse>(creditsUrl)

  const casts = creditsData?.cast.filter((credit) => credit.known_for_department === "Acting") ?? [];
  const crews = creditsData?.crew.filter((credit) => credit.job !== undefined) ?? [];

  const isPending = isDetailsPending || isCreditsPending;
  const isError = isDetailsError || isCreditsError;

  if(isError) {
    return (
      <div>
        <ErrorMsg/>
      </div>
    )
  }

  if(isPending || !detailsData) {
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
        <MovieHeader details={detailsData} />
        <CastAndCrew casts={casts} crews={crews} />
      </div>
    </>
  )
}

export default MovieDetailPage