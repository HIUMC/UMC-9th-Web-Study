import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import type { Tag } from '../types/lp';
import { Pencil, Trash2, Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import LoginModal from '../components/LoginModal';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// 상세 페이지 컴포넌트
const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: lp, isPending, isError } = useGetLpDetail(lpId || '');

  // 최초 마운트 시에만 로그인 체크
  useEffect(() => {
    if (!hasShownModal && !isAuthenticated) {
      setShowLoginModal(true);
      setHasShownModal(true);
    }
  }, [hasShownModal, isAuthenticated]);

  // 로그인 상태가 true로 변경될 때 모달을 닫는다.
  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
    }
  }, [isAuthenticated, showLoginModal]);

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
    // 현재 URL을 state로 전달하여 로그인 후 복귀할 수 있도록 했다.
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    navigate('/');
  };

  if(isPending) {
    return <LoadingSpinner />;
  }

  if(isError) {
    return <ErrorMessage />;
  }

  if (!lp) return null;

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleModalClose}
        onConfirm={handleLoginConfirm}
      />
      <div className='min-h-screen bg-black text-white'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-[#1C1C1E] rounded-lg p-6">
          {/* author 정보, 작성일 */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600">
                {lp.author?.profileImage ? (
                  <img 
                    src={lp.author.profileImage} 
                    alt={`${lp.author.name}'s profile`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                    {lp.author?.name?.[0] || '?'}
                  </div>
                )}
              </div>
              <span className="text-white">{lp.author?.name || '오타니얌'}</span>
            </div>
            <span className="text-gray-400 text-sm">1월 전</span>
          </div>

          {/* 제목 및 수정, 삭제 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{lp.title}</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:text-blue-400 transition-colors">
                <Pencil size={20} />
              </button>
              <button className="p-2 hover:text-red-400 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* 썸네일 */}
          <div className="aspect-square w-full max-w-xl mx-auto mb-6">
            <img 
              src={lp.thumbnail} 
              alt={lp.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 본문 */}
          <div className="mb-6 text-gray-300">
            {lp.content}
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {lp.tags?.map((tag: Tag) => (
              <span key={tag.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                # {tag.name}
              </span>
            ))}
          </div>

          {/* 좋아요 버튼 */}
          <div className="flex items-center justify-center">
            <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors">
              <Heart size={24} fill="currentColor" />
              <span>{lp.likes?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LpDetailPage;