import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="text-black flex justify-center items-center h-screen">
      <h1 className="text-5xl">{id}번 영화 상세페이지</h1>
    </div>
  );
};

export default MovieDetailPage;
