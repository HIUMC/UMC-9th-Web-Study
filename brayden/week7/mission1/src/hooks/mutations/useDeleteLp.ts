import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

function useDeleteLp() {
  return useMutation({
    mutationFn: deleteLp,
  });
}

export default useDeleteLp;
