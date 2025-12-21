import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      영화 상세 페이지입니다.
      <h1>{id}번 영화 상세페이지</h1>
    </div>
  );
};

export default MovieDetailPage;
