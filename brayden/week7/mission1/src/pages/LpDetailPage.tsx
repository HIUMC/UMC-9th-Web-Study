import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import modifyIcon from "../assets/modifyIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import { useAuth } from "../context/AuthContext";
import HeartButton from "../components/common/HeartButton";
import CommentButton from "../components/detailPage/CommentButton";
import Tag from "../components/common/Tag";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePatchLp from "../hooks/mutations/usePatchLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";

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
  const { mutate: patchMutate } = usePatchLp();
  const { mutate: deleteMutate } = useDeleteLp;

  // mutate -> 비동기 요청 실행하고 콜백함수를 이용해서 후속작업 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  // const isLiked = lpDetail?.data.likes
  //   .map((like) => like.userId)
  //   .includes(me?.data.id as number);

  const isLiked = lpDetail?.data.likes.some(
    (like) => like.userId === me?.data.id
  );

  const isMyLp = me?.data.id === lpDetail?.data.authorId;

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

  if (isPending) return <div className="mt-20">Loading...</div>;
  if (isError) return <div className="mt-20">Error...</div>;

  const lp = lpDetail?.data;

  return (
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
          <div>
            <span>17분 전</span>
          </div>
        </div>

        {/* LP 제목 및 수정, 삭제 버튼 */}
        <div className="flex flex-row gap-2 justify-between w-full">
          <h1 className="text-xl font-extrabold w-[80%] flex-1">{lp.title}</h1>
          {isMyLp && (
            <>
              <button>
                <img
                  className="invert cursor-pointer"
                  src={modifyIcon}
                  alt="modifyIcon"
                  width={20}
                  height={20}
                  color="white"
                />
              </button>
              <button>
                <img
                  className="invert cursor-pointer  "
                  src={deleteIcon}
                  alt="deleteIcon"
                  width={33}
                  height={33}
                  color="white"
                />
              </button>
            </>
          )}
        </div>
        {/* LP CD 사진 */}
        <div className="w-150 h-150 flex justify-center items-center shadow-xl shadow-black my-10 relative">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            className="rounded-full mb-4 w-130 h-130 max-w-xl border-4 border-black"
          />
          {/* 가운데 하얀 원 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full border-2 border-gray-400"></div>
          </div>
        </div>
        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {lp.content}
        </p>
        {/* 태그 공간 */}
        <Tag tagList={lp.tags} />
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
  );
};

export default LpDetailPage;
