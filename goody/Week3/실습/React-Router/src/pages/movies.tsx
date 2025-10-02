import { useParams } from "react-router-dom";

// src/pages/movies.tsx
const MoviesPage = () => {
    const params = useParams();

    console.log(params);

    return <h1>{params.movieId}번의 Movies Page 야호~!</h1>;
};

export default MoviesPage;