import { useState } from "react";
import { type Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import HeartButton from "../common/HeartButton";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const navigateLp = (id: number) => navigate(`/lps/${id}`);

  return (
    <div
      className={`relative overflow-hidden shadow-lg transition-transform duration-500 cursor-pointer 
        ${isHovered ? "z-20 scale-110 shadow-2xl" : "z-0 scale-100"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateLp(lp.id)}
    >
      <div className="relative w-full aspect-square">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-55"
        />

        {/* hover 시 표시되는 오버레이 */}
        <div
          className={`absolute inset-0 flex flex-col justify-end items-start p-3 
            transition-opacity duration-300 bg-black/50 text-white
            ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <h3 className="font-bold text-sm mb-1 w-[80%]">{lp.title}</h3>
          <div className="font-medium text-sm flex flex-row justify-between w-full">
            <h4>17 mins ago</h4>
            <HeartButton likesCount={lp.likes.length} islpCard={true} />
          </div>
          {/* <p className="text-xs text-gray-300">{timeAgo(lp.createdAt)}</p> */}
        </div>
      </div>
    </div>
  );
};

export default LpCard;
