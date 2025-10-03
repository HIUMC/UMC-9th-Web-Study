import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const params = useParams();
    console.log(params);
    
    return <div>MovieDetail</div>
}

export default MovieDetailPage;