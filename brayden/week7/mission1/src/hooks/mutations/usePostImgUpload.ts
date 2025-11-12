import { useMutation } from "@tanstack/react-query";
import { postImgUpload } from "../../apis/lp";

function usePostImgUpload() {
  return useMutation({
    mutationFn: postImgUpload,
  });
}

export default usePostImgUpload;
