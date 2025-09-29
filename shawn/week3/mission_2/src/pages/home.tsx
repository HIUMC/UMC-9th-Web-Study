// src/pages/home.tsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-700 mb-6">
            🎬 MovieDB에 오신 것을 환영합니다!
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            최신 영화 정보를 확인해보세요
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link
              to="/movies/popular"
              className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                인기 영화
              </h3>
              <p className="text-gray-600">
                현재 가장 인기 있는 영화들을 확인하세요
              </p>
            </Link>

            <Link
              to="/movies/now-playing"
              className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                상영 중
              </h3>
              <p className="text-gray-600">
                현재 상영 중인 영화들을 확인하세요
              </p>
            </Link>

            <Link
              to="/movies/top-rated"
              className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                평점 높은
              </h3>
              <p className="text-gray-600">
                높은 평점을 받은 명작들을 만나보세요
              </p>
            </Link>

            <Link
              to="/movies/upcoming"
              className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                개봉 예정
              </h3>
              <p className="text-gray-600">
                곧 개봉할 영화들을 미리 만나보세요
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
