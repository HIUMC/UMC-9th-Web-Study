import { useParams } from "react-router-dom";
import { useLoadDetail } from "../api/movieApi";
import { useState } from "react";
import type { Cast, Details } from "../types/movie";


const MovieDetail = () =>{
    const {movieId} = useParams<{ movieId: string}>();
    const [casts, setCasts] = useState<Cast[]>([]); // 렌더링
    const [details, setDetails] = useState<Details|null>(null);
    const [loading, setLoading] = useState(false); // 로딩중
    
    useLoadDetail(movieId, setDetails, setCasts, setLoading);
    console.log(details);
    console.log(casts);
    return(
        <>
        <div>
            
        </div>
        </>
    )
}

export default MovieDetail;