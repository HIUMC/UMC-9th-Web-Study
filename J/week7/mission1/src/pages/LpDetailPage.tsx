import { useNavigate, useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail"
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getTimeAgo } from "../utils/time";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { useGetInfiniteLpComments } from "../hooks/queries/useGetInfiniteLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CommentSkeleton } from "../components/CommentSkeleton";
import { usePostComment } from "../hooks/mutations/usePostComment";
import { usePatchComment } from "../hooks/mutations/usePatchComment";
import { useDeleteComment } from "../hooks/mutations/useDeleteComment";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import { usePatchLp } from "../hooks/mutations/usePatchLp";
import { usePostLike } from "../hooks/mutations/usePostLike";
import { useDeleteLike } from "../hooks/mutations/useDeleteLike";
import { usePostUpload } from "../hooks/mutations/usePostUpload";
import type { Tag, Likes, RequestCreateLpDto } from "../types/lp";

export const LpDetailPage = () => {
    const {lpid} = useParams<{lpid: string}>();
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.newest);
    const {data: lpDetailData, isError: isLpDetailError, isPending: isLpDetailPending, refetch: lpDetailRefetch} = useGetLpDetail(lpid!);
    const {data: lpCommentsData, isFetchingNextPage, hasNextPage, isPending: isLpCommentsPending, fetchNextPage, isError: isLpCommentsError, refetch: lpCommentsRefetch } = useGetInfiniteLpComments(lpid!, 5, order);
    const { mutate: postCommentMutate } = usePostComment(lpid!);
    const { mutate: patchCommentMutate } = usePatchComment(lpid!);
    const { mutate: deleteCommentMutate } = useDeleteComment(lpid!);
    const { mutate: deleteLpMutate } = useDeleteLp();
    const { mutate: patchLpMutate, isPending: isPatching } = usePatchLp(lpid!);
    const { mutate: postLikeMutate } = usePostLike(lpid!);
    const { mutate: deleteLikeMutate } = useDeleteLike(lpid!);
    const { mutateAsync: uploadFileAsync } = usePostUpload();
    const { userName, userId } = useAuth();
    const [ user, setUser ] = useState<ResponseMyInfoDto | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState<string>("");
    const [isEditingLp, setIsEditingLp] = useState(false);
    const [editLpTitle, setEditLpTitle] = useState(lpDetailData?.title ?? "");
    const [editLpContent, setEditLpContent] = useState(lpDetailData?.content ?? "");
    const [editLpTags, setEditLpTags] = useState<string[]>(lpDetailData?.tag?.map((t: Tag) => t.name) ?? []);
    const [editLpThumbnail, setEditLpThumbnail] = useState<string | null>(lpDetailData?.thumbnail ?? null);
    const [tagInput, setTagInput] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const isLiked = lpDetailData?.likes?.some((like: Likes) => like.userId === userId) ?? false;
    const navigate = useNavigate();
    const comments = lpCommentsData?.pages.flatMap((page) => page.data.data ?? []) ?? [];
    const observerRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const schema = z.object({
        content: z.string().min(1, { message: "댓글을 입력해주세요." }).max(100, { message: "댓글은 100자 이하로 입력해주세요." })
    });

    type ContentForm = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<ContentForm>({
        defaultValues: {
            content: "",
        },
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<ContentForm> = (data) => {
        const {...content} = data;
        postCommentMutate({...content}, {
            onSuccess: () => {
                reset();
            },
            onError: (err) => {
                console.error("댓글 작성 실패", err);
            },
        })
    }

    const handleEditComment = (commentId: number, currentContent: string) => {
        setEditingCommentId(commentId);
        setEditContent(currentContent);
        setOpenMenuId(null);
    };

    const handleSaveEdit = (commentId: number) => {
        if (editContent.trim().length === 0 || editContent.length > 100) {
            alert("댓글은 1자 이상 100자 이하로 입력해주세요.");
            return;
        }
        patchCommentMutate(
            { commentid: commentId, body: { content: editContent } },
            {
                onSuccess: () => {
                    setEditingCommentId(null);
                    setEditContent("");
                },
                onError: (err) => {
                    console.error("댓글 수정 실패", err);
                    alert("댓글 수정에 실패했습니다.");
                },
            }
        );
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditContent("");
    };

    const handleDeleteComment = (commentId: number) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            deleteCommentMutate(commentId, {
                onError: (err) => {
                    console.error("댓글 삭제 실패", err);
                    alert("댓글 삭제에 실패했습니다.");
                },
            });
        }
        setOpenMenuId(null);
    };

    const handleDeleteLp = (lpid: number) => {
        deleteLpMutate(lpid);
        navigate(-1);
    }

    const handleToggleLike = () => {
        if (isLiked) {
            deleteLikeMutate(undefined, {});
        } else {
            postLikeMutate(undefined, {});
        }
    };

    const handleSaveLpEdit = async () => {
        if (!editLpTitle.trim() || !editLpContent.trim()) {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        if (!lpDetailData) {
            alert("데이터를 불러올 수 없습니다.");
            return;
        }

        let thumbnailToSend: string | undefined = lpDetailData.thumbnail || undefined;

        if (thumbnailFile) {
            const formData = new FormData();
            formData.append("file", thumbnailFile);
            try {
                const response = await uploadFileAsync(formData);
                thumbnailToSend = response.data.imageUrl;
                if (!thumbnailToSend) {
                    throw new Error("이미지 URL을 받지 못했습니다.");
                }
            } catch (err) {
                console.error("썸네일 업로드 실패", err);
                alert("썸네일 업로드에 실패했습니다. 기존 썸네일로 저장됩니다.");
                // 업로드 실패 시 기존 썸네일 유지
                thumbnailToSend = lpDetailData.thumbnail || undefined;
            }
        }

        // 빈 문자열이 아닌 undefined로 처리
        if (thumbnailToSend === "") {
            thumbnailToSend = undefined;
        }

        const body: RequestCreateLpDto = {
            title: editLpTitle.trim(),
            content: editLpContent.trim(),
            thumbnail: thumbnailToSend,
            tags: editLpTags.length > 0 ? editLpTags : undefined,
            published: true,
        };

        console.log("수정 요청 데이터:", body);

        patchLpMutate(body, {
            onSuccess: () => {
                setIsEditingLp(false);
                setThumbnailFile(null);
                setThumbnailUrl("");
                lpDetailRefetch();
            },
            onError: (err: any) => {
                console.error("LP 수정 실패", err);
                const errorMessage = err?.response?.data?.message || err?.message || "알 수 없는 오류가 발생했습니다.";
                alert(`LP 수정에 실패했습니다: ${errorMessage}`);
            },
        });
    };

    const isTagValid = tagInput.trim() !=="";

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !editLpTags.includes(tag)) {
            setEditLpTags([...editLpTags, tag]);
            setTagInput("");
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setEditLpTags(editLpTags.filter((t) => t !== tagToRemove));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailUrl(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    
    useEffect(() => {
        const getUser = async () => {
            const response = await getMyInfo();
            console.log(response);
            setUser(response);
        };
    
        getUser();
    }, []);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        const current = observerRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.comment-menu')) {
                setOpenMenuId(null);
            }
        };

        if (openMenuId !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    useEffect(() => {
        if (lpDetailData && !isEditingLp) {
            try {
                const tags = lpDetailData.tags?.map((t: Tag) => t.name) ?? [];
                setEditLpTags(tags);
                setEditLpTitle(lpDetailData.title ?? "");
                setEditLpContent(lpDetailData.content ?? "");
                setEditLpThumbnail(lpDetailData.thumbnail ?? null);
            } catch (error) {
                console.error("데이터 동기화 오류:", error);
            }
        }
    }, [lpDetailData, isEditingLp]);

    if (isLpDetailPending || !lpDetailData) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="w-12 h-12 border-4 border-t-neutral-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isLpDetailError) {
        alert("Error")
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
                <button
                    onClick={() => lpDetailRefetch()}
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                >
                    재시도
                </button>
            </div>
        );
    }

    return (
    <div className="flex justify-center">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-10 m-20 text-white flex flex-col gap-6 w-[900px]">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 ">
                        <img src = {user?.data.avatar ? user?.data.avatar : "/src/assets/default-avatar.webp"} alt={"구글 로고"} className="w-8 h-8 rounded-full object-cover shadow-sm"/>
                        <p className="font-semibold">{userName}</p>
                    </div>
                    <p className="text-gray-400">{getTimeAgo(lpDetailData.createdAt)}</p>
                </div>
                {isEditingLp ? (
                    <div className="flex flex-col gap-6 w-full">
                        <input
                            type="text"
                            value={editLpTitle}
                            onChange={(e) => setEditLpTitle(e.target.value)}
                            placeholder="Title"
                            className="w-full p-2 text-xl font-bold rounded bg-neutral-700 border border-gray-600"
                        />
                        <div className="flex flex-col justify-center items-center">
                            <img
                                src={thumbnailUrl || editLpThumbnail || (lpDetailData.thumbnail ? lpDetailData.thumbnail : `https://picsum.photos/400/300?random=${lpDetailData.id}`)}
                                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg cursor-pointer"
                                onClick={handleImageClick}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <textarea
                            value={editLpContent}
                            onChange={(e) => setEditLpContent(e.target.value)}
                            placeholder="Content"
                            rows={3}
                            className="w-full p-2 text-base rounded bg-neutral-700 border border-gray-600"
                        />
                        <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="LP Tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-400 flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!isTagValid}
                        className={`px-5 py-2 rounded
                            ${isTagValid 
                                ? "bg-pink-500 text-white hover:bg-pink-600 transition-colors cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
                    >   
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {editLpTags.map((tag) => (
                        <span
                            key={tag}
                            className="border px-2 py-1 rounded flex items-center gap-1"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-gray-300 hover:text-white cursor-pointer"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>
                        <div className="flex gap-2 justify-end mt-2">
                            <button onClick={() => {
                                setIsEditingLp(false);
                                setEditLpTitle(lpDetailData.title);
                                setEditLpContent(lpDetailData.content);
                                setEditLpTags(lpDetailData.tags?.map((t: Tag) => t.name) ?? []);
                                setEditLpThumbnail(lpDetailData.thumbnail ?? null);
                                setThumbnailFile(null);
                                setThumbnailUrl("");
                            }} className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700">취소</button>
                            <button onClick={handleSaveLpEdit} disabled={isPatching} className="px-3 py-1 bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                {isPatching ? "저장 중..." : "저장"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-xl font-bold">{lpDetailData.title}</h1>
                                <div>
                                    <button
                                        onClick={() => {
                                            try {
                                                setIsEditingLp(true);
                                                setEditLpTitle(lpDetailData?.title ?? "");
                                                setEditLpContent(lpDetailData?.content ?? "");
                                                setEditLpTags(lpDetailData?.tags?.map((t: Tag) => t.name) ?? []);
                                                setEditLpThumbnail(lpDetailData?.thumbnail ?? null);
                                                setThumbnailFile(null);
                                                setThumbnailUrl("");
                                            } catch (error) {
                                                console.error("수정 모드 진입 오류:", error);
                                                alert("수정 모드로 전환하는 중 오류가 발생했습니다.");
                                            }
                                        }}
                                        className="p-2 hover:bg-gray-700 rounded transition">
                                        <FiEdit2 size={20}/>
                                    </button>
                                    <button
                                        onClick={()=>handleDeleteLp(lpDetailData.id)}
                                        className="p-2 hover:bg-red-700 rounded transition">
                                        <RiDeleteBin6Line size={20}/>
                                    </button>
                                </div>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={lpDetailData.thumbnail ? lpDetailData.thumbnail : `https://picsum.photos/400/300?random=${lpDetailData.id}`}
                                alt={lpDetailData.title}
                                className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
                            />
                        </div>
                    
                        <div className="text-gray-200 text-base leading-relaxed">{lpDetailData.content}</div>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {lpDetailData.tag?.map((tag: Tag) => (
                                <span key={tag.id} className="bg-gray-700 text-white px-2 py-1 rounded-full">
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
                <div className="flex justify-center items-center gap-1">
                    <button
                        onClick={handleToggleLike}>
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    {lpDetailData.likes.length}
                </div>
            
                <div className=" bg-neutral-900 rounded-lg shadow-lg p-6 text-white flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-lg font-bold">댓글</h2>
                        <div className="inline-flex rounded-lg overflow-hidden border border-neutral-700">
                        <button
                            onClick={() => setOrder(PAGINATION_ORDER.oldest)}
                            className={`px-4 py-2 transition-colors ${
                            order === PAGINATION_ORDER.oldest
                                ? "bg-white text-black"
                                : "bg-neutral-800 hover:bg-neutral-700"
                            }`}
                        >
                            오래된순
                        </button>
                        <button
                            onClick={() => setOrder(PAGINATION_ORDER.newest)}
                            className={`px-4 py-2 transition-colors ${
                            order === PAGINATION_ORDER.newest
                                ? "bg-white text-black"
                                : "bg-neutral-800 hover:bg-neutral-700"
                            }`}
                        >
                            최신순
                        </button>
                    </div>
                </div>
                <div className="bg-neutral-900 rounded-lg py-4">
                    <div className="flex flex-row justify-between gap-8">
                        <textarea
                            {...register("content")}
                            placeholder="댓글을 입력해주세요"
                            className={`w-full bg-neutral-800 p-2 rounded-md resize-none border-2 
                                ${ errors.content ? "border-blue-300" : "border-gray-300"}`}
                                rows={1}
                        />
                        <button
                            disabled={!isValid || isSubmitting}
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="flex-shrink-0 bg-pink-500 hover:bg-pink-600 text-white text-sm px-3 py-2 rounded-md transition disabled:bg-gray-300"
                        >
                            등록
                        </button>
                    </div>
                    {errors.content && <div className={"text-red-500 text-sm"}>{errors.content.message}</div>}
                </div>

                {isLpCommentsPending && <CommentSkeleton/>}

                {isLpCommentsError && (
                    <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
                        <button
                            onClick={() => lpCommentsRefetch()}
                            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                        >
                        재시도
                        </button>
                    </div>
                )}

                {comments.length === 0 && !isLpCommentsPending ? (<p className="text-gray-400">댓글이 없습니다</p>) : (comments.map((comment: any) => {
                    const isMyComment = userId !== null && comment.authorId === userId;
                    const isEditing = editingCommentId === comment.id;
                    const isMenuOpen = openMenuId === comment.id;

                    return (
                    <div key={comment.id} className="border-b border-gray-700 pb-3 mb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="font-semibold">{comment.author?.name ?? "익명"}</div>
                                <div className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</div>
                            </div>
                            {isMyComment && !isEditing && (
                                <div className="relative comment-menu">
                                    <button
                                        onClick={() => setOpenMenuId(isMenuOpen ? null : comment.id)}
                                        className="p-1 hover:bg-gray-700 rounded transition"
                                    >
                                        <HiDotsVertical size={15} />
                                    </button>
                                    {isMenuOpen && (
                                        <div className="absolute right-0 top-8 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-10 flex flex-col min-w-[100px]">
                                            <button
                                                onClick={() => handleEditComment(comment.id, comment.content)}
                                                className="px-4 py-2 hover:bg-neutral-700 flex items-center gap-2 text-sm transition"
                                            >
                                                <FiEdit2 size={16} />
                                                수정
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="px-4 py-2 hover:bg-neutral-700 flex items-center gap-2 text-sm text-red-400 transition"
                                            >
                                                <RiDeleteBin6Line size={16} />
                                                삭제
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        {isEditing ? (
                            <div className="mt-2 flex flex-col gap-2">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full bg-neutral-800 p-2 rounded-md resize-none border-2 border-gray-300 text-gray-300"
                                    rows={2}
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={() => handleSaveEdit(comment.id)}
                                        className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white text-sm rounded transition"
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-300 mt-2">{comment.content}</p>
                        )}
                    </div>
                    );
                })
                )}
                {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)}
                <div ref={observerRef}/>
            </div>
            </div>
        </div>
)

}