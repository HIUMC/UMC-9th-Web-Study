import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp"
import { Heart } from "lucide-react";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";


interface LpCardProps {
    lp:Lp
}

const LpCard = ({lp}:LpCardProps) => {
    const navigate = useNavigate();
    const {accessToken} = useAuth();
    const {data:me} = useGetMyInfo(accessToken);
    const isLiked = lp?.likes.some((like) => like.userId === me?.data.id);
  return (
    <div 
        onClick={() => navigate(`/lp/${lp.id}`)}
        className="relative cursor-pointer overflow-hidden group aspect-square w-44 rounded-2xl transition-transform duration-300 hover:scale-115"
    >   
        <img
            src={lp.thumbnail}
            alt={`${lp.title} 이미지`}
            className="w-full h-full object-cover"
        />
                                
        <div className="absolute inset-0 bg-gradient-to-t from-black/50  bg-opacity-70 text-white
            flex flex-col items-center justify-center p-2
            opacity-0 group-hover:opacity-100 grotransition-opacity duration-300">
            <h3 className="text-md font-semibold">{lp.title}</h3>
            <p className="text-sm">{new Date(lp.updatedAt).toLocaleString()}</p>
            <Heart color={isLiked ? "red" : "white"} fill={isLiked ? "red" : "transparent"}/>
            {lp.likes.length}
        </div>
        
    </div>
  )
}

export default LpCard
