import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpList";
import Comment from "../components/Comments/Comment";
import { LuHeart, LuPencil, LuTrash2 } from "react-icons/lu";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useState, type ChangeEvent, type FormEvent } from "react";
import PlusButton from "../components/Buttons/PlusButton";
import PlusLpModal from "../components/Modals/PlusLpModal";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import type { PostLpDto } from "../types/lp";

const DetailPage = () => {
  const { lpid } = useParams();
  const lpIdNum = Number(lpid);
  const navigate = useNavigate();

  const { data, isPending, isError } = useGetLpDetail({ lpId: Number(lpid) });

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // 글 작성자인지 확인
  const isAuthor = data?.author.id === me?.data.id;
  console.log(data?.author.id, me?.data.id);
  const isLiked = data?.likes.some((like) => like.userId === me?.data.id);

  // DetailPage 수정/삭제
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateLp();
  const { mutate: deleteMutate } = useDeleteLp();

  const [isEditing, setIsEditing] = useState(false);
  // 폼 데이터를 관리할 별도 state
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    thumbnail: "",
    tagsString: "", // 태그는 쉼표로 구분된 문자열로 관리
  });

  const handleLikeLp = () => {
    me?.data.id && likeMutate({ lpId: Number(lpid) });
  };
  const handleDislikeLp = () => {
    me?.data.id && disLikeMutate({ lpId: Number(lpid) });
  };

  // 모달 관리
  const [open, setOpen] = useState(false);
  const handlePlusLp = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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

  // --- [추가] 5. 수정 모드 진입/취소 핸들러 ---
  const handleEditToggle = () => {
    setEditForm({
      title: data.title,
      content: data.content,
      thumbnail: data.thumbnail,
      // 2. data.tags가 null일 수 있으므로 안전하게 접근합니다 (깜빡임/크래시 방지)
      tagsString: data?.tags?.map((tag: any) => tag.name).join(", ") ?? "",
    });

    // 3. [핵심] 클릭 이벤트가 '저장' 버튼으로 전달되는 것을 막기 위해
    // state 변경(UI 교체)을 다음 이벤트 루프로 넘깁니다.
    setTimeout(() => {
      setIsEditing(!isEditing);
    }, 0);
  };

  // --- [추가] 6. 폼 입력 변경 핸들러 ---
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // --- [추가] 7. 삭제 핸들러 ---
  const handleDeleteLp = () => {
    if (window.confirm("정말 이 LP를 삭제하시겠습니까?")) {
      deleteMutate(
        { lpId: lpIdNum },
        {
          onSuccess: () => {
            alert("삭제되었습니다.");
            navigate("/"); // 삭제 후 홈으로 이동
          },
        }
      );
    }
  };

  // --- [추가] 8. 저장(제출) 핸들러 ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API가 요구하는 형식(PostLpDto)에 맞게 데이터 가공
    const payload: PostLpDto = {
      title: editForm.title,
      content: editForm.content,
      thumbnail: editForm.thumbnail,
      tags: editForm.tagsString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published: data.published, // 기존 'published' 상태 유지
    };

    updateMutate(
      { lpId: lpIdNum, ...payload },
      {
        onSuccess: () => {
          setIsEditing(false); // 수정 모드 종료
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 overflow-auto">
        <div className="flex justify-between">
          <div>
            {isEditing ? (
              <>
                <p className="text-lg text-gray-400 mb-2">제목</p>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleFormChange}
                  className="w-full text-3xl font-bold bg-gray-700 p-2 rounded-md"
                />
              </>
            ) : (
              <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
            )}
            <p className="text-lg text-gray-400 mb-2">
              작성자: {data.author.name} ({data.author.email})
            </p>
          </div>

          {isAuthor && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="text-green-500 hover:text-green-400 disabled:opacity-50"
                  >
                    {isUpdating ? "저장중..." : "저장"}
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle} // 취소
                    className="text-gray-400 hover:text-white"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleEditToggle} // 수정
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <LuPencil size={14} className="mr-2" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteLp} // 삭제
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <LuTrash2 size={14} className="mr-2" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="my-4">
          {isEditing ? (
            <div>
              <label className="text-sm text-gray-400">썸네일 URL</label>
              <input
                type="text"
                name="thumbnail"
                value={editForm.thumbnail}
                onChange={handleFormChange}
                className="w-full text-white bg-gray-700 p-2 rounded-md"
              />
              {editForm.thumbnail && (
                <img
                  src={editForm.thumbnail}
                  alt="미리보기"
                  className="rounded-lg shadow-md w-full max-w-xs mx-auto aspect-square object-cover mt-2"
                />
              )}
            </div>
          ) : (
            <img
              src={data.thumbnail}
              alt={data.title}
              className="rounded-lg shadow-md w-full max-w-2xs mx-auto aspect-square object-cover"
            />
          )}
        </div>

        {isEditing ? (
          <div>
            <label className="text-sm text-gray-400">본문</label>
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleFormChange}
              className="w-full text-white bg-gray-700 p-2 rounded-md"
              rows={10}
            />
          </div>
        ) : (
          <p className="text-white my-4 whitespace-pre-line">{data.content}</p>
        )}

        {isEditing ? (
          <div>
            <label className="text-sm text-gray-400">태그 (쉼표로 구분)</label>
            <input
              type="text"
              name="tagsString"
              value={editForm.tagsString}
              onChange={handleFormChange}
              className="w-full text-white bg-gray-700 p-2 rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.tags.map(
              (
                tag: any // API 타입에 맞게 any 수정
              ) => (
                <span
                  key={tag.id}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  #{tag.name}
                </span>
              )
            )}
          </div>
        )}

        <p className="mt-4 text-gray-500">
          최종 수정일: {new Date(data.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          좋아요: {data.likes.length}{" "}
          <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <LuHeart
              className="cursor-pointer"
              color={isLiked ? "red" : "white"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
        </p>
        {open && <PlusLpModal onClose={onClose} />}
        <Comment myId={me?.data.id} />
      </form>
      <PlusButton handlePlus={handlePlusLp} isOpen={open} />
    </>
  );
};

export default DetailPage;
