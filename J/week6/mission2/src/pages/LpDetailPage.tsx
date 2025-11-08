import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail"
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getTimeAgo } from "../utils/time";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo, postComment } from "../apis/auth";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGetInfiniteLpComments } from "../hooks/queries/useGetInfiniteLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CommentSkeleton } from "../components/CommentSkeleton";

export const LpDetailPage = () => {
    const {lpid} = useParams<{lpid: string}>();
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.newest);
    const {data: lpDetailData, isError: isLpDetailError, isPending: isLpDetailPending, refetch: lpDetailRefetch} = useGetLpDetail(lpid!);
    const {data: lpCommentsData,  isFetching, isFetchingNextPage, hasNextPage, isPending: isLpCommentsPending, fetchNextPage, isError: isLpCommentsError, refetch: lpCommentsRefetch } = useGetInfiniteLpComments(lpid!, 5, order)
    const { userName} = useAuth();
    const [ user, setUser ] = useState<ResponseMyInfoDto | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const comments = lpCommentsData?.pages.flatMap((page) => page.data.data ?? []) ?? [];
    const observerRef = useRef<HTMLDivElement | null>(null);

    const schema = z.object({
        content: z.string().min(1, { message: "댓글을 입력해주세요." }).max(100, { message: "댓글은 100자 이하로 입력해주세요." })
    });

    type ContentForm = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<ContentForm>({
        defaultValues: {
            content: "",
        },
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<ContentForm> = async (data) => {
        const {...content} = data;
        await postComment(lpid!, content);
    }
    
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
                        <img src = {user?.data.avatar ?? "/src/assets/default-avatar.webp"} alt={"구글 로고"} className="w-8 h-8 rounded-full object-cover shadow-sm"/>
                        <p className="font-semibold">{userName}</p>
                    </div>
                    <p className="text-gray-400">{getTimeAgo(lpDetailData.createdAt)}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl font-bold">{lpDetailData.title}</h1>
                    <div>
                        <button className="p-2 hover:bg-gray-700 rounded transition">
                            <FiEdit2 size={20}/>
                        </button>
                        <button className="p-2 hover:bg-red-700 rounded transition">
                            <RiDeleteBin6Line size={20}/>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img
                        src={`https://picsum.photos/400/300?random=${lpDetailData.id}`}
                        alt={lpDetailData.title}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
                    />
                </div>
                    
                <div className="text-gray-200 text-base leading-relaxed">{lpDetailData.content}</div>
                <div className="flex justify-center items-center gap-1">
                    <button
                        onClick={() => {
                            setIsLiked(!isLiked)
                            }}>
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    {lpDetailData.likes.length}
                </div>
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
                            className={`w-full bg-neutral-800 p-2 rounded-md resize-none 
                                ${ errors.content ? "border-blue-300 border-2" : "border-gray-300"}`}
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

                {comments.length === 0 && !isLpCommentsPending ? (<p className="text-gray-400">댓글이 없습니다</p>) : (comments.map((comment: any) => (
                    <div key={comment.id} className="border-b border-gray-700 pb-3 mb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">{comment.author?.name ?? "익명"}</div>
                                <div className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</div>
                            </div>
                        </div>
                        <p className="text-gray-300 mt-2">{comment.content}</p>
                    </div>
                    ))
                )}
                {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)}
                <div ref={observerRef}/>
            </div>
        </div>
    </div>
)

}