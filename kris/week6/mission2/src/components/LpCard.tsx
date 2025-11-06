import { Link } from "react-router-dom";
import type { LpDetails } from "../types/lp";

interface LpCardProps {
  lp: LpDetails
}

const getTimesAgo = (date: Date | string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} years ago`;
  if (months > 0) return `${months} months ago`;
  if (weeks > 0) return `${weeks} weeks ago`;
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
}

const LpCard = ({lp}: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} className="w-[200px] m-2 hover:scale-110 transition-transform cursor-pointer overflow-hidden relative">
      <img className="w-full h-[200px] " src={lp.thumbnail} alt="" />
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