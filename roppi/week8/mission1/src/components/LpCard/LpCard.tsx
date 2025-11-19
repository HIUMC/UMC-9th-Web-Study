import { useState } from "react";
import type { Lp as LpType } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

interface LpProps {
  lp: LpType;
}

const LpCard = ({ lp }: LpProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const nav = useNavigate();

    const handleNavLp = (id: number) => {
    nav(`/lps/${id}`)
  }


  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer  transition-transform duration-500 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => nav(`/lps/${lp.id}`)}
    >
   <div key={lp.id} className="relative w-full aspect-square group hover:z-10"
          onClick={() => handleNavLp(lp.id)}
          >
            {/* 이미지 */}
            <img
              className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110 group-hover:brightness-55 "
              src={lp.thumbnail}
              alt={lp.title}
            />

            {/* 오버레이 */}
            <div className="absolute inset-0  bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col justify-end items-start gap-5 p-2">
              <h3 className="text-white font-bold text-sm mb-1">{lp.title}</h3>
              <p className="text-gray-300 text-xs">{timeAgo(lp.createdAt)}</p>
              <div className="text-white absolute right-0 "> 
              <span>♥︎</span>
              <span> {lp.likes.length}</span>                
              </div>
            </div>
        </div>

    </div>
  );
}

export default LpCard;