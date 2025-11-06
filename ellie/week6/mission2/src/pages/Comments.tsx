import CommentSkeleton from "../components/CommentSkeleton";
import Mycomment from "../components/Mycomment";
import Comment from "../components/comment";

export default function Comments() {
  return (
    <div className="relative bg-gray-700 w-175 h-full rounded-lg flex flex-col justify-center items-center">
      <div className="absolute top-5 flex flex-row w-full justify-between p-4 ">
        <p className="text-white">댓글</p>
        <div className="flex justify-end mb-4">
          <button className="w-20 h-8 border border-white rounded-sm bg-white text-black">
            오래된순
          </button>
          <button className="w-20 h-8 border border-white rounded-sm bg-black text-white">
            최신순
          </button>
        </div>
      </div>
      <div className="absolute top-20 flex flex-row w-full justify-between p-4 h-17">
        <input
          type="text"
          placeholder="댓글을 입력해 주세요"
          className="border-2 w-150 rounded-md border-white placeholder:text-white placeholder:p-2"
        />
        <button className="bg-black text-white cursor-pointer w-15 text-sm rounded-md">
          작성
        </button>
      </div>
      <div className="absolute top-40 w-full h-96 overflow-y-auto">
        <Mycomment />
        <Comment />
        <Comment />
        <CommentSkeleton />
        <CommentSkeleton />
      </div>
    </div>
  );
}
