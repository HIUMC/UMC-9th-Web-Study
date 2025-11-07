import { Link } from "react-router-dom";
import type { Lp } from "../../types/lp.ts";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <Link to={`/lp/${lp.id}`} key={lp.id}>
      <div
        key={lp.id}
        className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 "
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-50"
        />
        <div className="absolute bottom-0 left-0 right-0 opacity-0 p-2 group-hover:opacity-100">
          <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
          <p>{new Date(lp.updatedAt).toISOString().split("T")[0]}</p>
          <p>Likes {lp.likes.length}</p>
        </div>
      </div>
    </Link>
  );
};

export default LpCard;
