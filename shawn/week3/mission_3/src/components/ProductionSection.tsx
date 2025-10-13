import type { MovieDetails } from "../types/movie";

interface ProductionSectionProps {
  movieDetails: MovieDetails;
}

const ProductionSection = ({ movieDetails }: ProductionSectionProps) => {
  if (movieDetails.production_companies.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">제작사</h2>
      <div className="flex flex-wrap gap-4">
        {movieDetails.production_companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-4"
          >
            {company.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`}
                alt={company.name}
                className="h-8 object-contain"
              />
            ) : (
              <span className="text-gray-700 font-semibold">
                {company.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionSection;
