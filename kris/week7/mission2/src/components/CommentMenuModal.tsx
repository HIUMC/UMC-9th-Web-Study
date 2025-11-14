import { PencilIcon, Trash } from "lucide-react";
import usePatchLpComment from "../hooks/mutations/usePatchLpComment";

export const CommentMenuModal = ({lpId, commentId}: {lpId: number, commentId: number}) => {
  const {mutate: patchLpComment} = usePatchLpComment(lpId, commentId);

  return (
    <>
    <div className="absolute flex flex-row space-x-1 m-1 p-1 bg-black rounded-md">
      <PencilIcon className="scale-80 cursor-pointer"/>
      <Trash className="scale-80 cursor-pointer"/>
    </div>
    </>
  )
}