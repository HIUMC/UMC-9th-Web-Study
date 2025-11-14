import { Link } from "react-router-dom";
import type { LpDetails } from "../types/lp";
import { getTimesAgo } from "../utils/getTimesAgo";

interface LpCardProps {
  lp: LpDetails
}

const LpCard = ({lp}: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} className="w-[200px] m-2 hover:scale-110 transition-transform cursor-pointer overflow-hidden relative">
      <img 
        className="w-full h-[200px] object-cover"
        src={lp.thumbnail}
        alt={lp.title}
      />
      <div className="absolute inset-0 flex flex-col justify-end opacity-0 bg-black/40 hover:opacity-100 p-2 transition-opacity">
        <p className="text-sm font-bold">{lp.title}</p>
        <div className="flex flex-row justify-between">
          <p className="text-sm">{getTimesAgo(lp.createdAt)}</p>
        </div>
      </div>
    </Link>
  )
}

export default LpCard;