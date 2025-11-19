import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useAuth } from "../context/AuthContext";
import HeartButton from "../components/common/HeartButton";
import CommentButton from "../components/detailPage/CommentButton";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchLp from "../hooks/mutations/usePatchLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import usePostLike from "../hooks/mutations/like/usePostLike";
import useDeleteLike from "../hooks/mutations/like/useDeleteLike";
import DeleteButton from "../components/common/DeleteButton";
import ModifyButton from "../components/common/ModifyButton";
import { useState } from "react";
import timeCalculate from "../components/common/TimeCalculate";
import CheckButton from "../components/common/CheckButton";
import InputComponent from "../components/ModalComponent/InputComponent";
import usePostImg from "../hooks/mutations/usePostImg";
import Tag from "../components/common/Tag";
import AddButton from "../components/common/AddButton";
import ImgSelector from "../components/ModalComponent/ImgSelector";
import Modal from "../components/ModalComponent/Modal";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const { data: me } = useGetMyInfo(accessToken);
  const {
    data: lpDetail,
    isPending,
    isError,
  } = useGetLpDetail({ lpid: Number(lpid) });

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // mutate -> 비동기 요청 실행하고 콜백함수를 이용해서 후속작업 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLp } = useDeleteLp();
  const { mutate: patchLp } = usePatchLp();
  const { mutate: uploadImg } = usePostImg();

  // const isLiked = lpDetail?.data.likes
  //   .map((like) => like.userId)
  //   .includes(me?.data.id as number);

  if (isPending) return <div className="mt-20">Loading...</div>;
  if (isError) return <div className="mt-20">Error...</div>;

  // isPending, isError 처리되어있으면 lpDetail은 undefined X
  // LP 데이터 변수
  const lp = lpDetail.data;

  // 내 LP 판단 변수(isMyLp), 내 좋아요 판단변수(isLiked)
  const isMyLp = me?.data.id === lpDetail.data.authorId;
  const isLiked = lpDetail.data.likes.some(
    (like) => like.userId === me?.data.id
  );

  // 현재 정보(시간, 제목, 태그, 썸네일, 내용)
  const currentTime = lpDetail.data.updatedAt;
  const currentTags = lpDetail.data.tags.map((tagContent) => tagContent.name);
  const currentTitle = lpDetail.data.title;
  const currentContent = lpDetail.data.content;
  const currentThumbnail = lpDetail.data.thumbnail;

  const handleLikeLp = () => {
    // likeMutate({ lpid: Number(lpid) });
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login");
      return;
    }
    if (me?.data.id) likeMutate({ lpid: Number(lpid) });
  };

  const handleDislikeLp = () => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login");
      return;
    }
    if (me?.data.id) dislikeMutate({ lpid: Number(lpid) });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagInput(e.target.value);
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (tags == undefined) return;
    if (tags.includes(tagInput)) return;
    setTags((prev) => [...prev, tagInput]);
    setTagInput("");
  };
  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
  };
  const handleModifyLp = () => {
    setIsEditing(true);
    setTitle(currentTitle);
    setContent(currentContent);
    setTags(currentTags);
    setThumbnail(currentThumbnail);
  };

  const handleStartDelete = () => setIsDeleting(true);
  const handleEndDelete = () => setIsDeleting(false);
  const handleDeleteLp = () => {
    handleStartDelete();
    deleteLp({ lpid: Number(lpid) });
    navigate("/");
  };

  const handleEditComplete = () => {
    if (selectedFile !== null) {
      uploadImg(selectedFile, {
        onSuccess: (thumbnailUrl) => {
          setThumbnail(thumbnailUrl);
        },
      });
    }

    const body = {
      title,
      content,
      tags,
      thumbnail,
      published: true,
    };

    patchLp(
      { lpid: Number(lpid), body },
      {
        onSuccess: () => {
          setIsEditing(false);
          setTitle("");
          setContent("");
          setTags([]);
          setThumbnail("");
        },
      }
    );
  };

  // lpDetail이 로딩중일 때 isPending이 true가 되면 렌더링이 위에서 멈춤
  // 하지만 const lp 밑에 isPending, isError를 선언할 경우
  // data가 바로 들어오는 게 아니기 때문에 초기 data는 undefined
  // 따라서 lpDetail?.data는 undefined이므로 lp도 undefined
  // 즉, 렌더링 시점에 lp는 일시적으로 undefined가 되버림
  // 따라서 isPending return, isError return은 렌더링 시점 이전에 선언해야함.

  return (
    <>
      <div className="rounded-xl bg-[#28292e] text-white w-[80%] my-10 mx-auto flex justify-center items-center">
        {/* 상세페이지 내용 */}
        <div className="w-[80%] flex flex-col my-10 items-center">
          {/* 프로필 및 시간 */}
          <div className="flex flex-row justify-between w-full">
            {/* 작성자 프로필 */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={lp.author.avatar}
                alt={lp.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">{lp.author.name}</h2>
              </div>
            </div>
            {/* 수정 시간 정보(몇 분 전) */}
            {!isEditing && (
              <div>
                <span>{timeCalculate(currentTime)}</span>
              </div>
            )}
          </div>

          {/* LP 제목 및 수정, 삭제 버튼 */}
          <div className="flex flex-row gap-2 justify-between w-full">
            {!isEditing ? (
              <h1 className="text-xl font-extrabold w-[80%] flex-1">
                {lp.title}
              </h1>
            ) : (
              <InputComponent value={title} onChange={handleTitle} />
            )}
            {isMyLp &&
              (!isEditing ? (
                <>
                  <ModifyButton onClick={handleModifyLp} size={24} />
                  <DeleteButton onClick={handleStartDelete} size={24} />
                </>
              ) : (
                <CheckButton onClick={handleEditComplete} size={24} />
              ))}
          </div>
          {/* LP CD 사진 */}
          <div className="relative w-150 h-150 flex justify-center items-center shadow-xl shadow-black my-10">
            {/* 이미지 선택기 (오버레이) */}
            {isEditing && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-500/50">
                <ImgSelector
                  onChange={(file) => setSelectedFile(file)}
                  className="w-full h-full cursor-pointer opacity-0" // 클릭만 가능하게
                />
              </div>
            )}

            {/* LP 썸네일 */}
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="rounded-full mb-4 w-130 h-130 max-w-xl border-4 border-black"
            />

            {/* LP 중앙 흰 원 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full border-2 border-gray-400"></div>
            </div>
          </div>

          {/* LP Content 공간 */}
          {!isEditing ? (
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {lp.content}
            </p>
          ) : (
            <InputComponent value={content} onChange={handleContent} />
          )}
          {/* 태그 공간 */}
          {!isEditing ? (
            <Tag tagList={lp.tags} />
          ) : (
            <>
              <div className="flex flex-row gap-2 w-full mt-2">
                <InputComponent
                  value={tagInput}
                  inputComment="LP Tag"
                  onChange={handleTag}
                  onEnterPress={handleAddTag}
                />
                <AddButton onClick={handleAddTag} buttonText="Add" />
              </div>
              <Tag
                tagList={tags}
                isTagModifying={true}
                onTagModified={handleDeleteTag}
              />
            </>
          )}
          {/* 좋아요 공간 */}
          <div className="flex flex-row py-2 gap-2">
            <HeartButton
              likesCount={lp.likes.length}
              isLiked={isLiked}
              onClicked={isLiked ? handleDislikeLp : handleLikeLp}
            />
            <CommentButton lpId={lp.id} />
          </div>
        </div>
      </div>
      {isDeleting && (
        <Modal onClick={handleEndDelete}>
          <div className="flex flex-col items-center w-lg z-100 my-30">
            <span className="text-xl text-white">정말 삭제하시겠습니까?</span>
            <div className="mt-10 w-xs justify-between flex">
              <button
                onClick={handleDeleteLp}
                className="text-black rounded-sm bg-gray-200 w-25 h-8 cursor-pointer"
              >
                예
              </button>
              <button
                onClick={handleEndDelete}
                className="text-white rounded-sm bg-pink-500 w-25 h-8 cursor-pointer"
              >
                아니오
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LpDetailPage;
