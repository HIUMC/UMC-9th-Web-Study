import { useMutation } from '@tanstack/react-query';
import { deleteMyAccount } from '../../apis/auth';

export const useDeleteAccountMutation = () => {
    return useMutation({
        mutationFn: () => deleteMyAccount(),
    });
};
