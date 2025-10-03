import { useParams } from 'react-router-dom';    

const Movies = () => {
  const params = useParams(); // {movieId?: string}
  console.log(params); // 예 : {movieId: "123"}
  return <h1>{params.movieId}번의 영화 페이지입니다.</h1>;
};
export default Movies;