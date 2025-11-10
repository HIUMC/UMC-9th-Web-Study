import { useParams } from "react-router-dom";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import type { RequestCommentDto } from "../../types/comment";

interface CommentsProps {
    id : number;
    content : string;
    author : {
        name: string;
        avatar: string | null ;
    };
}

const CommentCard = ({id,content,author}:CommentsProps) => {

    const { lpid } = useParams();
    const {accessToken} = useAuth();
    const {data:me} = useGetMyInfo(accessToken);

    // 본인 확인용
    const isAuthor = me?.data.name === author.name;

    // 수정/메뉴 상태 관리
    const [isEditing,setIsEditing] = useState(false);
    const [updateContent,setUpdateContent] = useState(content);
    const [isMenuOpen,setIsMenuOpen] = useState(false);

    const { mutate: editCommentMutate } = usePatchComment(Number(lpid), id)
    const { mutate : deleteCommentMutate } = useDeleteComment(Number(lpid),id)

    // 수정 제출 핸들러
    const handleEditSubmit = () => {
        if (updateContent.trim() === "") {
            alert("댓글 내용을 입력해주세요.");
            return;
        }
        const payload: RequestCommentDto = { content: updateContent };

        editCommentMutate(payload, {
            onSuccess: () => {
                setIsEditing(false); // 수정 모드 종료
                setIsMenuOpen(false);
            },
        });
    };
    // 수정 취소 핸들러
    const handleCancelEdit = () => {
        setIsEditing(false);
        setUpdateContent(content); // 내용 원상복구
        setIsMenuOpen(false);
    };
    // 삭제 핸들러
    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
        deleteCommentMutate(undefined, {
            onSuccess: () => {
            setIsMenuOpen(false);
            },
        });
    } else {
        setIsMenuOpen(false);
    }};

    return (
        <div className="flex flex-col w-full gap-6 mt-6 border-4 bg-amber-900 border-amber-100 mr-10 relative rounded-2xl">
            <div key={id} className="flex items-start gap-3">
                {/* 프로필 이미지 (임시) */}
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0">
                    {author.avatar ? (
                        <img
                        src={author.avatar}
                        className="rounded-sm w-full h-full object-cover"
                        alt={author.name}
                        />
                        ) : (
                        // 아바타가 null일 때 기본 아이콘 (예시)
                        <div className="w-full h-full rounded-sm bg-gray-500" />
                    )} 
                </div>
                {/* 이름 + 댓글 내용 */}
                <div className="flex-1">
                    <span className="text-sm font-bold text-white block mb-1">
                        {author.name} 
                    </span>
                    {!isEditing ? (
                        // 일반 모드
                        <p className="text-sm text-gray-300">{content}</p>
                    ) : (
                        // 수정 모드
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={updateContent}
                                onChange={(e) => setUpdateContent(e.target.value)}
                                className="w-full px-3 py-2 bg-neutral-800 text-white rounded border border-neutral-600"
                            />
                            <div className="flex gap-2">
                                <button
                                onClick={handleEditSubmit}
                                className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                                >
                                저장
                                </button>
                                <button
                                onClick={handleCancelEdit}
                                className="px-3 py-1 bg-gray-500 text-white rounded text-xs"
                                >
                                취소
                                </button>
                            </div>
                        </div>
                    )}
                    
                </div>
                {isAuthor && !isEditing && (
                <div className="absolute top-2 right-2">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white p-1 rounded-full hover:bg-neutral-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </button>

                {/* 메뉴 */}
                {isMenuOpen && (
                    <div className="absolute top-full right-0 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-10 w-24">
                    <button
                        onClick={() => {
                        setIsEditing(true);
                        setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-neutral-700"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-neutral-700"
                    >
                        삭제
                    </button>
                    </div>
                )}
                </div>
            )}
            </div>
                
        </div>
        
    )
}

export default CommentCard
