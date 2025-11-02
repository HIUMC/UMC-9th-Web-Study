export default function Comment() {
  return (
    <>
      <div className="relative flex flex-row items-center w-full h-17 p-4">
        <img
          className="size-12 rounded-full mr-4"
          src="https://www.gravatar.com/avatar/?d=mp&s=200"
        />
        <div className="text-white ">
          <h1 className="absolute top-2 text-lg">이름</h1>
          <p className="absolute bottom-2">댓글 내용</p>
        </div>
      </div>
    </>
  );
}
