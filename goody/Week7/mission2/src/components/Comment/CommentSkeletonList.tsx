import CommentSkeleton from "./CommentSkeleton"

interface CommentsProps {
    count : number
}
const CommentSkeletonList = ({count}:CommentsProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_,idx) => (
            <CommentSkeleton key={idx}/>
        ))}
    </>
  )
}

export default CommentSkeletonList
