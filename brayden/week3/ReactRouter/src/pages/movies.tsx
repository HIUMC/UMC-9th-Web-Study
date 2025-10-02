import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const params = useParams();

  console.log(params);

  return <h1>{params.movieId}번의 Movies Page</h1>;
};

export default MoviesPage;

// 객체로 반환 <- 여러 개의 파라미터를 동시에 받을 수 있기 때문
// 예시 : path: 'users/:userId/posts/:postId
// ->{userId, postID} 형태로 돌려줌

// 파라미터 이름은 라우트 정의에서 쓴 이름 그대로 옴
// path: 'movies/:movieId' -> params.movieId
// path : 'movies/:matthew' -> params.matthew
