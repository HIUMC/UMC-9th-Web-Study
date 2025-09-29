import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const params = useParams();
  return(
    <>
    MovieDetailPage{params.movieId}
    </>)
};
 export default MovieDetailPage;