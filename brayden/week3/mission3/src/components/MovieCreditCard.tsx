import type { MovieCredit } from "../types/movie";

interface MovieCreditProps {
  movieCredit: MovieCredit;
}

export default function MovieCreditCard({ movieCredit }: MovieCreditProps) {
  // order에 따라 나열될 것이므로, 여기서 order를 표시하지는 않음.
  // profile_path가 없을 경우를 대비하여 대체 이미지를 표시
  const profileImageUrl = movieCredit.profile_path
    ? `https://image.tmdb.org/t/p/w200${movieCredit.profile_path}`
    : "/placeholder-profile.png"; // 적절한 대체 이미지 경로를 사용하세요.

  return (
    // 카드의 기본 너비를 제한하고 Flex-col을 사용하여 세로로 쌓습니다.
    <div className="flex flex-col items-center w-28 md:w-36 text-center shadow-lg rounded-lg overflow-hidden bg-gray-900 text-white transition-all hover:scale-105">
      {/* 프로필 사진 섹션 */}
      <img
        src={profileImageUrl}
        alt={`${movieCredit.name} 출연진 프로필 사진`}
        className="w-full h-36 md:h-48 object-cover object-top" // object-top으로 얼굴이 잘리지 않게 설정
      />
      <div className="p-3 w-full">
        {/* order (나열 순서)는 CSS 정렬로 처리되므로, 정보 카드 자체에는 표시하지 않습니다.
            만약 표시하고 싶다면 아래 주석처럼 추가할 수 있습니다.
            <p className="text-sm font-light text-gray-400">#{movieCredit.order}</p> 
        */}
        <p
          className="text-base font-semibold truncate"
          title={movieCredit.name}
        >
          {movieCredit.name}
        </p>
        <p
          className="text-sm text-gray-400 line-clamp-2"
          title={movieCredit.character}
        >
          {movieCredit.character}
        </p>
      </div>
    </div>
  );
}
