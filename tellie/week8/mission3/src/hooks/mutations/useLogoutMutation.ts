import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLogout } from '../../apis/auth';
import { QUERY_KEY } from '../../constants/key';

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postLogout(),
        onSuccess: () => {
            // 로그아웃 시 myInfo 캐시 제거
            queryClient.removeQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
};
