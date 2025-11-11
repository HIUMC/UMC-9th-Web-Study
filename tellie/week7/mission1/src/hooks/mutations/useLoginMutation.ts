import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignin } from '../../apis/auth';
import type { RequestSigninDto } from '../../types/auth';
import { QUERY_KEY } from '../../constants/key';

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (signinData: RequestSigninDto) => postSignin(signinData),
        onSuccess: () => {
            // 로그인 성공 시 이전 사용자 정보 캐시 제거
            queryClient.removeQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
};
