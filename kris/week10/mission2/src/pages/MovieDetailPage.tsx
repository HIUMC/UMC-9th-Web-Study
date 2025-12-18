import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Movie Detail Page</h1>
      <h2>{id}번 영화</h2>
    </div>
  );
}
