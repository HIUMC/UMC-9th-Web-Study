import { useMutation } from '@tanstack/react-query';
import { postLogout } from '../../apis/auth';

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: () => postLogout(),
    });
};
