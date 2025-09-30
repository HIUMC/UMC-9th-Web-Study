import type { Credits } from "../types/movie";

interface CastSectionProps {
  credits: Credits | null;
}

const CastSection = ({ credits }: CastSectionProps) => {
  const mainCast = credits?.cast.slice(0, 6) || [];

  if (mainCast.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">주요 출연진</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {mainCast.map((actor) => (
          <div key={actor.id} className="text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                  : "https://via.placeholder.com/150x225/1f2937/9ca3af?text=No+Image"
              }
              alt={actor.name}
              className="w-full h-64 object-cover rounded-lg mb-3 shadow-lg"
            />
            <h3 className="text-gray-800 font-semibold text-sm mb-1">
              {actor.name}
            </h3>
            <p className="text-gray-500 text-xs">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastSection;
