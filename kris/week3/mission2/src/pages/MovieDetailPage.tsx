import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const params = useParams();
  console.log(params)
  return (
    <div>movie detail {params.movieId}</div>
  )
  
}

export default MovieDetailPage