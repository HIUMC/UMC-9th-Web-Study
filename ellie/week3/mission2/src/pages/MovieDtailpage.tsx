import { useParams } from "react-router-dom"

export default function MovieDetailPage() {
  const params = useParams();

  return <div>MovieDetailPage{params.movieId}</div>
}