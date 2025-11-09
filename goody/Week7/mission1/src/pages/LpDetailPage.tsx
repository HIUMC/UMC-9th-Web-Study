import { useNavigate, useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useRef, useState } from "react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from 'lucide-react'
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { Modal } from "../components/Modal";
import CommentPage from "./CommentPage";
import usePatchLps from "../hooks/mutations/usePatchLps";
import useDeleteLps from "../hooks/mutations/useDeleteLps";
import useImageUpload from "../hooks/mutations/useImageUpload";
import type { CreateLpsDto } from "../types/lp";

const LpDetailPage = () => {
    
    const {lpid} = useParams(); // lpid : string(params는 string으로 가져옴)

    const {data:lp, isPending, isError} = useGetLpDetail({lpid:Number(lpid)})

    const [CommentOpen,setCommentOpen] = useState(false);

    const {accessToken} = useAuth();

    const {data:me} = useGetMyInfo(accessToken);
    // 좋아요 mutate
    // mutate : 비동기 요청을 실행하고 콜백 함수를 이용해서 후속 작업 처리
    // mutateAsync : Promise를 반환해서 await 사용 가능
    const {mutate : likeMutate} = usePostLike();
    const {mutate : dislikeMutate} = useDeleteLike();


    // const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number); // 바로 반영이 안됨 => mutation!
    const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id); // some : 배열안에 주어진 함수를 하나라도 통과하는지 테스트, 좀 더 빠름

    const navigate = useNavigate();

    const handleCommits = () => {
        setCommentOpen(true);
    }

    // 좋아요 관련 handle
    const handleLikeLp = () => {
        likeMutate({lpid:Number(lpid)})
    }
    const handleDisLikeLp = () => {
        dislikeMutate({lpid:Number(lpid)})
    }

    // 수정, 삭제 
    const isAuthor = me?.data.id === lp?.data.authorId;
    const [isEditing, setIsEditing] = useState(false);
    // 폼 입력
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editTags, setEditTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('');
    // 이미지 수정
    const [iamgePreview, setImagePreview] = useState<string | null>(null); // 미리보기용 URL
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null); // 서버 전송용 URL
    const fileInputRef = useRef<HTMLInputElement>(null); // 숨겨진 input을 위한 ref

    const {mutate : patchLpMutate} = usePatchLps(Number(lpid));
    const {mutate : deleteLpMutate} = useDeleteLps();

    const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
        onSuccessCallback: (data) => {
            // 업로드 성공 시 반환된 URL(data.imageUrl)을 state에 저장
            console.log("이미지 업로드 성공! 서버 응답:", data);
            setImagePreview(data.data.imageUrl)
            setThumbnailUrl(data.data.imageUrl); // 👈 핵심: 서버 URL 저장
        },
        onErrorCallback: (error) => {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드에 실패했습니다.");
            // 실패 시 미리보기와 파일 초기화
            setImagePreview(lp?.data.thumbnail);
            setThumbnailUrl(lp?.data.thumbnail)
        }
    });

    const handleStartEdit = () => {
        setEditTitle(lp.data.title);
        setEditContent(lp.data.content);
        setImagePreview(lp.data.thumbnail); 
        setThumbnailUrl(lp.data.thumbnail);     
        setEditTags(lp?.data.tags.map(tag => tag.name));
        setTagInput("");
        setIsEditing(true);
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1단계: 로컬 미리보기
        const localPreview = URL.createObjectURL(file);
        setImagePreview(localPreview);

        // 2단계: 서버로 파일 업로드
        const formData = new FormData();
        formData.append("file", file);
        uploadImage(formData);
    };

    const handleSaveEdit = () => {
        const payload : CreateLpsDto = {
            title : editTitle,
            content : editContent,
            thumbnail : thumbnailUrl,
            tags : editTags,
            published : true,
        }
        
        patchLpMutate(payload,{
            onSuccess : () => {
                setIsEditing(false);
            },
        })
    }

    const handleDelete = () => {
        deleteLpMutate({lpid: Number(lpid)}, {
            onSuccess: () => {
                navigate('/');
            }
        })
    }

    const handleAddTag = () => {
        if (tagInput && !editTags.includes(tagInput)) {
        setEditTags([...editTags, tagInput]);
        setTagInput(''); // 입력창 초기화
        }
    };
    const handleRemoveTag = (tagToRemove: string) => {
        setEditTags(editTags.filter(tag => tag !== tagToRemove));
    };


    if(isPending){
        return (
            <div className="flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if(isError){
        return (
            <div className="flex items-center justify-center">상세 데이터를 불러올 수 없습니다.</div>
        )
    }
    
    return (
        <div className="mt-20 mx-auto h-screenjustify-center items-center border-gray-500 border-2 p-4 rounded-large shadow-lg bg-lime-200 w-[70%] max-h-[100vh]">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1>{typeof lp?.data.author === 'string' ? lp.data.author : ((lp.data.author).name ?? JSON.stringify(lp.data.author))}</h1>
                    <p>{new Date(lp.data.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                    {!isEditing ? (
                        <h1 className="text-xl">{lp.data.title}</h1>
                    ) : (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-xl p-2 border rounded"
                        />
                    )}
                    <div className="flex gap-5 mr-5">
                        {isAuthor && (
                            <>
                                {!isEditing ? (
                                // 보기 모드 버튼
                                <>
                                    <button onClick={handleStartEdit} className="cursor-pointer">✏️</button>
                                    <button onClick={handleDelete} className="cursor-pointer">🗑️</button>
                                </>
                                ) : (
                                // 수정 모드 버튼
                                <>
                                    <button onClick={handleSaveEdit} className="cursor-pointer">
                                        💾
                                    </button>
                                </>
                                )}
                            </>
                            )}
                        <button 
                            className={"cursor-pointer"}
                            onClick={handleCommits}>💬</button>
                    </div>
                </div>
                {isEditing ? (
                    // 수정 모드: 클릭 가능한 이미지
                    <img
                        src={iamgePreview} // 👈 미리보기 state 사용
                        alt={editTitle}
                        className="aspect-square w-full object-cover rounded-2xl cursor-pointer relative w-1/2 mx-auto" // 👈 커서 변경
                        onClick={() => !isUploading && fileInputRef.current?.click()} // 👈 클릭 시 input 실행
                    />
                    ) : (
                    // 보기 모드: 일반 이미지
                    <img
                        src={lp.data.thumbnail}
                        alt={lp.data.title}
                        className="aspect-square w-1/2 mx-auto object-cover rounded-2xl "
                    />
                    )}
                {!isEditing ? (
                    <>
                    <h2 className="flex justify-center items-center">{lp.data.content}</h2>
                    <div className="flex justify-center items-center">
                    {lp.data.tags.map((tag) => (
                        <span key={tag.id} className="p-2 bg-gray-400 text-black rounded-md">#{tag.name}</span>
                    ))}
                    </div>
                    </>
                ) : (
                    <>
                    <input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="p-2 border rounded"
                        type="text"
                    />
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input
                            type="text"
                            placeholder="태그 입력"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            />
                            <button
                            type="button"
                            onClick={handleAddTag}
                            className="p-2 bg-gray-600 text-white rounded"
                            >
                            추가
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {editTags.map((tag) => (
                            <div key={tag} className="flex items-center gap-1 p-2 bg-gray-700 text-white rounded-md text-sm">
                                <span>{tag}</span>
                                <button
                                onClick={() => handleRemoveTag(tag)}
                                className="font-bold hover:text-red-500"
                                >
                                X
                                </button>
                            </div>
                            ))}
                        </div>
                    </div>
                    </>
                )}
                
                <button onClick={isLiked ? handleDisLikeLp : handleLikeLp} className="flex justify-center items-center">
                    <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"}/>
                    {lp.data.likes.length}
                </button>
                

            </div>
            <Modal isOpen={CommentOpen} onClose={() => setCommentOpen(false)}>
                <CommentPage />
            </Modal>
        </div>
    )
}

export default LpDetailPage
