import { useMutation } from "@tanstack/react-query";
import { postImg } from "../../apis/lp";

function usePostImg() {
  return useMutation({
    mutationFn: postImg,
  });
}

export default usePostImg;
