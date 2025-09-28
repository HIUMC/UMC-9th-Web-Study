import { useParams } from "react-router-dom"

const MovieDetailPage = () => {
  const params = useParams();

  console.log(params);
  return (
    <div>
      MovieDetailPage
    </div>
  )
}

export default MovieDetailPage
