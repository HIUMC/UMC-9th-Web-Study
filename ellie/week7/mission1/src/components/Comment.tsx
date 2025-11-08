interface CommentProps {
  author: string;
  content: string;
  createdAt?: string;
  avatarUrl?: string | null;
}

export default function Comment({
  author,
  content,
  createdAt,
  avatarUrl,
}: CommentProps) {
  return (
    <>
      <div className=" flex flex-row items-center w-full p-4">
        <img
          className="size-12 rounded-full mr-4"
          src={
            avatarUrl
              ? avatarUrl
              : "https://www.gravatar.com/avatar/?d=mp&s=200"
          }
        />
        <div className="text-white flex flex-col">
          <h1 className=" text-lg">{author}</h1>
          <p className="">{content}</p>
        </div>
      </div>
    </>
  );
}
