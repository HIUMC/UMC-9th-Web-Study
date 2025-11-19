import { useMutation } from '@tanstack/react-query';
import { deleteLp } from '../../apis/lp';
import { useNavigate } from 'react-router-dom';

export const useDeleteLpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (lpId: string) => deleteLp(lpId),
    onSuccess: () => {
      alert('LP가 삭제되었습니다.');
      navigate('/');
    },
    onError: (error: any) => {
      console.error('LP 삭제 실패:', error);
      alert(`LP 삭제에 실패했습니다.\n${error?.response?.data?.message || "알 수 없는 오류"}`);
    },
  });
};
