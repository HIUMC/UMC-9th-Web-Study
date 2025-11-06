import { use, useState } from "react";
import type { Lp as LpType } from "../types/lp";
import { useNavigate } from "react-router-dom";

interface LpProps {
  lp: LpType;
}

export default function Lp({ lp }: LpProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/v1/lps/${lp.id}`)}
    >
      <img src={lp.thumbnail} alt={lp.title} className="size-45 object-cover" />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center p-4 text-white transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-md font-bold leading-snug line-clamp-2">
          {lp.title}
        </h2>
        <p className="text-xs text-gray-300 leading-relaxed mt-2 ">
          {new Date(lp.updatedAt).toISOString().split("T")[0]}
        </p>
        <p className="text-xs text-gray-300 leading-relaxed mt-2 ">
          🤍 {lp.likes.length}
        </p>
      </div>
    </div>
  );
}
