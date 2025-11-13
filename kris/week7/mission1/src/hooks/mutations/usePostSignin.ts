import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

function usePostSignin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postSignin,
    onSuccess: () => {

      navigate('/', { replace: true });
    }
  })
}