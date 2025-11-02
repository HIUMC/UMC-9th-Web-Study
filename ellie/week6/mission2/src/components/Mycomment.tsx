export default function Mycomment() {
  return (
    <>
      <div className="relative flex flex-row items-center w-full h-17 p-4">
        <img
          className="size-12 rounded-full mr-4"
          src="https://www.gravatar.com/avatar/?d=mp&s=200"
        />
        <div className="text-white ">
          <h1 className="absolute top-2 text-lg">연진김</h1>
          <p className="absolute bottom-2">내가 썼음!</p>
        </div>
      </div>
    </>
  );
}
