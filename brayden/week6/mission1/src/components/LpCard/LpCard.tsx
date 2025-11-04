import { type Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        {/* <h3 className="text-white text-sm font-semibold">{lp.title}</h3> */}
      </div>
    </div>
  );
};

export default LpCard;
