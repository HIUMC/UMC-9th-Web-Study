import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

export const LpCard = (lp: Lp) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleLpClick = (id: number) => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      // 로그인 후 돌아올 페이지를 URL 매개변수로 전달
      // 쿼리 파라미터는 라우팅(목적지)에 영향이 없다.
      navigate(`/login?redirect=/lp/${id}`);
      return;
    }
    navigate(`/lp/${id}`);
  };

  return (
    <div
      key={lp.id}
      className="group relative overflow-hidden aspect-square cursor-pointer"
      onClick={() => handleLpClick(lp.id)}
    >
      {/*썸네일 이미지*/}
      <img src={lp.thumbnail || undefined} alt={lp.title} className="w-full h-full object-cover" />

      {/*오버레이*/}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity flex items-end p-4">
        <div className="w-full">
          <h3 className="text-white text-lg font-bold truncate mb-1">{lp.title}</h3>
          <div className="flex justify-between items-center text-gray-300 text-sm">
            <span>{new Date(lp.updatedAt).toLocaleDateString()}</span>
            <span>❤️ {lp.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
