import { useMutation } from "@tanstack/react-query";
import type { ResponseImageURL } from "../../types/lp";
import { postUpload } from "../../apis/lp";

export const usePostUpload = () => {
  return useMutation<ResponseImageURL, Error, FormData>({
    mutationFn: postUpload,
  });
};
