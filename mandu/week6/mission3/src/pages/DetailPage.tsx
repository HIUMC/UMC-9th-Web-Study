import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpList";
import Comment from "../components/Comments/Comment";

const DetailPage = () => {
  const { lpid } = useParams();

  const { data, isPending, isError } = useGetLpDetail({ lpId: lpid });

  console.log(data);

  if (isPending) {
    return (
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-2xl">Error loading data.</h1>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
      <p className="text-lg text-gray-400 mb-2">
        작성자: {data.author.name} ({data.author.email})
      </p>

      <div className="my-4">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="rounded-lg shadow-md w-full max-w-2xs mx-auto aspect-square object-cover"
        />
      </div>

      <p className="text-white my-4 whitespace-pre-line">{data.content}</p>

      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag.id}
            className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <p className="mt-4 text-gray-500">
        최종 수정일: {new Date(data.updatedAt).toLocaleDateString()}
      </p>
      <p className="text-gray-500">좋아요: {data.likes.length}</p>
      <Comment />
    </div>
  );
};

export default DetailPage;
