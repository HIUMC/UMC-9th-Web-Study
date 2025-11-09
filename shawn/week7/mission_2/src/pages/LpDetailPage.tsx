/**
 * ========================================
 * LP 상세 페이지 (LpDetailPage)
 * ========================================
 *
 * 특정 LP(Landing Page)의 상세 정보를 보여주는 페이지입니다.
 * LP 내용, 태그, 좋아요, 댓글 등을 표시하고 상호작용할 수 있습니다.
 *
 * 주요 기능:
 * 1. LP 상세 정보 표시 (제목, 내용, 썸네일, 태그, 작성일 등)
 * 2. 좋아요 기능 (로그인 필요)
 * 3. 댓글 모달 (무한 스크롤, 정렬, 작성/수정/삭제)
 * 4. 로딩 스켈레톤 (부드러운 UX를 위한 최소 표시 시간 설정)
 * 5. 에러 처리 (404, 네트워크 에러 등)
 *
 * 댓글 모달 기능:
 * - 무한 스크롤로 댓글 로딩
 * - 오래된순/최신순 정렬
 * - 댓글 작성 (로그인 필요)
 * - 본인 댓글 수정/삭제
 * - 모달 닫을 때 캐시 삭제 (항상 최신 데이터 표시)
 *
 * 스켈레톤 로딩 전략:
 * - 초기 로딩: 최소 1500ms 표시 (너무 빠른 깜빡임 방지)
 * - 추가 로딩: 최소 1000ms 표시
 * - 부드러운 UX를 위한 딜레이 적용
 *
 * 상태 관리:
 * - React Query: LP 데이터 및 댓글 데이터 캐싱
 * - Local State: 좋아요 상태, 모달 상태, 댓글 입력 등
 * - Query Client: 캐시 무효화 및 수동 제어
 */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetLpComments from "../hooks/queries/useGetLpComments";
import { useAuth } from "../context/AuthContext";
import { PAGINATION_ORDER } from "../enums/common";
import CommentSkeleton from "../components/CommentSkeleton";
import EditLpModal from "../components/EditLpModal";
import { getMyInfo } from "../apis/auth";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createComment,
  updateComment,
  deleteComment,
  updateLp,
  deleteLp,
  uploadImage,
} from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

/**
 * LP 상세 페이지 컴포넌트
 * URL 파라미터로 받은 lpId를 사용하여 LP 정보를 조회하고 표시
 */
export default function LpDetailPage() {
  // ==================== 라우터 및 인증 ====================
  const { lpId } = useParams<{ lpId: string }>(); // URL에서 LP ID 가져오기
  const navigate = useNavigate(); // 페이지 네비게이션
  const { accessToken } = useAuth(); // 로그인 상태 확인
  const queryClient = useQueryClient(); // React Query 캐시 관리

  // ==================== LP 데이터 조회 ====================
  const { data, isLoading, error, refetch } = useGetLpDetail(lpId || "");

  // ==================== 좋아요 관련 상태 ====================
  const [likesCount, setLikesCount] = useState(0); // 좋아요 개수
  const [isLiked, setIsLiked] = useState(false); // 현재 사용자의 좋아요 여부
  const [userName, setUserName] = useState<string>("사용자"); // 로그인한 사용자 이름

  // 댓글 모달 상태
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [showCommentSkeleton, setShowCommentSkeleton] = useState(false);
  const [showNextPageSkeleton, setShowNextPageSkeleton] = useState(false);

  // 댓글 관련 상태
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.asc
  );
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const commentObserverTarget = useRef<HTMLDivElement>(null);
  const commentScrollRef = useRef<HTMLDivElement>(null);

  // 댓글 수정/삭제 관련 상태
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [showMenuCommentId, setShowMenuCommentId] = useState<number | null>(
    null
  );
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  // LP 수정/삭제 관련 상태
  const [showLpMenu, setShowLpMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLpTitle, setEditLpTitle] = useState("");
  const [editLpContent, setEditLpContent] = useState("");
  const [editLpTags, setEditLpTags] = useState<string[]>([]);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string>("");

  // 댓글 쿼리 (모달이 열렸을 때만 실행)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpComments({
    lpId: lpId || "",
    order: commentOrder,
    enabled: isCommentModalOpen, // 모달이 열렸을 때만 쿼리 실행
  });

  // 댓글 생성 Mutation
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(lpId || "", content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
      setNewComment("");
      setCommentError("");
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
      setCommentError("댓글 작성에 실패했습니다.");
    },
  });

  // 댓글 수정 Mutation
  const updateCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => updateComment(lpId || "", commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
      setEditingCommentId(null);
      setEditingContent("");
      setShowMenuCommentId(null);
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    },
  });

  // 댓글 삭제 Mutation
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteComment(lpId || "", commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpComments", lpId] });
      setShowMenuCommentId(null);
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  // 이미지 업로드 Mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  // LP 수정 Mutation
  const updateLpMutation = useMutation({
    mutationFn: (lpData: {
      title?: string;
      content?: string;
      thumbnail?: string;
      tags?: string[];
    }) => updateLp(lpId || "", lpData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      setShowEditModal(false);
      alert("LP가 수정되었습니다.");
    },
    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("LP 수정에 실패했습니다.");
    },
  });

  // LP 삭제 Mutation
  const deleteLpMutation = useMutation({
    mutationFn: () => deleteLp(lpId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      alert("LP가 삭제되었습니다.");
      navigate("/");
    },
    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("LP 삭제에 실패했습니다.");
    },
  });

  // 모달 열릴 때 스켈레톤 표시 (최소 1500ms)
  useEffect(() => {
    if (isCommentModalOpen && isCommentsLoading) {
      setShowCommentSkeleton(true);
      const timer = setTimeout(() => {
        setShowCommentSkeleton(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (!isCommentsLoading) {
      // 로딩이 끝나도 최소 시간 보장
      const timer = setTimeout(() => {
        setShowCommentSkeleton(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCommentModalOpen, isCommentsLoading]);

  // 무한 스크롤 추가 로딩 시 스켈레톤 표시 (최소 1000ms)
  useEffect(() => {
    if (isFetchingNextPage) {
      setShowNextPageSkeleton(true);
      const timer = setTimeout(() => {
        setShowNextPageSkeleton(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowNextPageSkeleton(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isFetchingNextPage]);

  // 모달이 닫힐 때 캐시 삭제 (다음에 열릴 때 새로 로드)
  useEffect(() => {
    if (!isCommentModalOpen) {
      // 모달이 닫히면 캐시 삭제
      queryClient.removeQueries({ queryKey: ["lpComments", lpId] });
      console.log("🗑️ 댓글 캐시 삭제됨");
    }
  }, [isCommentModalOpen, queryClient, lpId]);

  // 댓글 로딩 상태 디버깅
  useEffect(() => {
    console.log("📊 댓글 로딩 상태:", {
      isCommentsLoading,
      isCommentModalOpen,
      hasPages: !!commentsData?.pages,
      pagesLength: commentsData?.pages?.length,
      hasNextPage,
      isFetchingNextPage,
    });
  }, [
    isCommentsLoading,
    isCommentModalOpen,
    commentsData?.pages,
    hasNextPage,
    isFetchingNextPage,
  ]);

  // 비로그인 사용자 체크
  useEffect(() => {
    if (!accessToken) {
      const shouldLogin = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      if (shouldLogin) {
        // 현재 경로를 저장하고 로그인 페이지로 이동
        sessionStorage.setItem("redirectPath", window.location.pathname);
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [accessToken, navigate]);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
        try {
          const response = await getMyInfo();
          setUserName(response.data.name);
          setCurrentUserId(response.data.id); // 사용자 ID 저장
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
        }
      }
    };
    fetchUserInfo();
  }, [accessToken]);

  // 데이터 로드 시 좋아요 수 초기화
  useEffect(() => {
    if (data?.data) {
      setLikesCount(data.data.likes?.length || 0);
    }
  }, [data]);

  // 모든 페이지의 댓글 데이터를 하나의 배열로 합치기
  const allComments =
    commentsData?.pages.flatMap((page) => page.data.data) ?? [];

  // 댓글 무한 스크롤 (모달 내부 스크롤용)
  useEffect(() => {
    if (!isCommentModalOpen) {
      console.log("❌ 모달 닫힘 - Observer 설정 안함");
      return;
    }

    if (showCommentSkeleton) {
      console.log("⏳ 스켈레톤 표시 중 - Observer 설정 대기");
      return;
    }

    if (!commentObserverTarget.current || !commentScrollRef.current) {
      console.log("⚠️ ref 없음:", {
        target: !!commentObserverTarget.current,
        scroll: !!commentScrollRef.current,
      });
      return;
    }

    console.log("🔵 댓글 Observer 설정:", {
      hasNextPage,
      isFetchingNextPage,
      commentsCount: allComments.length,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("🟢 댓글 Observer 트리거:", {
          isIntersecting: entries[0].isIntersecting,
          hasNextPage,
          isFetchingNextPage,
        });

        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("✅ 댓글 다음 페이지 로드!");
          fetchNextPage();
        }
      },
      {
        root: commentScrollRef.current, // 모달 스크롤 컨테이너를 root로 지정
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(commentObserverTarget.current);

    return () => {
      console.log("🔴 댓글 Observer 해제");
      observer.disconnect();
    };
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isCommentModalOpen,
    showCommentSkeleton,
    allComments.length,
  ]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "오늘";
    if (days === 1) return "1일 전";
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  };

  // handleDelete는 handleLpDelete로 대체됨

  const handleLike = () => {
    // 좋아요 토글
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
    // 실제 API 호출은 추후 구현
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!newComment.trim()) {
      setCommentError("댓글을 입력해주세요.");
      return;
    }

    if (newComment.trim().length < 2) {
      setCommentError("댓글은 최소 2자 이상 입력해주세요.");
      return;
    }

    // 댓글 작성 API 호출
    createCommentMutation.mutate(newComment.trim());
  };

  // 댓글 수정 핸들러
  const handleCommentEdit = (commentId: number) => {
    setEditingCommentId(commentId);
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      setEditingContent(comment.content);
    }
    setShowMenuCommentId(null);
  };

  // 댓글 수정 제출
  const handleEditSubmit = (commentId: number) => {
    if (!editingContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    updateCommentMutation.mutate({
      commentId,
      content: editingContent.trim(),
    });
  };

  // 댓글 수정 취소
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId: number) => {
    if (confirm("정말 이 댓글을 삭제하시겠습니까?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  // LP 수정 버튼 클릭
  const handleLpEditClick = () => {
    if (data?.data) {
      setEditLpTitle(data.data.title);
      setEditLpContent(data.data.content);
      setEditLpTags(data.data.tags?.map((tag) => tag.name) || []);
      setEditPreviewUrl(data.data.thumbnail || "");
      setShowEditModal(true);
      setShowLpMenu(false);
    }
  };

  // LP 수정 제출
  const handleLpEditSubmit = async (formData: {
    title: string;
    content: string;
    tags: string[];
    file: File | null;
  }) => {
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      let thumbnailUrl = data?.data.thumbnail;

      // 새 이미지가 선택된 경우 업로드
      if (formData.file) {
        const imageResult = await uploadImageMutation.mutateAsync(
          formData.file
        );
        thumbnailUrl = imageResult.data.imageUrl;
      }

      await updateLpMutation.mutateAsync({
        title: formData.title.trim(),
        content: formData.content.trim(),
        thumbnail: thumbnailUrl,
        tags: formData.tags,
      });
    } catch (error) {
      console.error("LP 수정 실패:", error);
    }
  };

  // LP 삭제
  const handleLpDelete = () => {
    if (confirm("정말 이 LP를 삭제하시겠습니까?")) {
      deleteLpMutation.mutate();
      setShowLpMenu(false);
    }
  };

  const formatCommentDate = (dateString: Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString("ko-KR");
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* 헤더 스켈레톤 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-full" />
                <div className="h-4 w-20 bg-[#1a1a1a] rounded" />
              </div>
              <div className="h-4 w-16 bg-[#1a1a1a] rounded" />
            </div>
            {/* 제목 스켈레톤 */}
            <div className="h-8 w-64 bg-[#1a1a1a] rounded mb-8" />
            {/* 이미지 스켈레톤 */}
            <div className="w-full max-w-2xl mx-auto aspect-square bg-[#1a1a1a] rounded-full mb-8" />
            {/* 본문 스켈레톤 */}
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-[#1a1a1a] rounded w-full" />
              <div className="h-4 bg-[#1a1a1a] rounded w-5/6" />
              <div className="h-4 bg-[#1a1a1a] rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !data) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="text-red-400 text-center">
              <p className="text-lg font-medium mb-2">
                LP를 불러올 수 없습니다
              </p>
              <p className="text-sm text-gray-400">
                {error ? String(error) : "데이터를 찾을 수 없습니다"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => refetch()}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
              >
                다시 시도
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-md transition-colors"
              >
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lp = data.data;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* 헤더: 작성자 정보와 시간 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-300 font-medium">{userName}</span>
          </div>
          <span className="text-sm text-gray-400">
            {formatDate(lp.createdAt)}
          </span>
        </div>

        {/* 제목과 액션 버튼 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{lp.title}</h1>
          <div className="flex items-center gap-3">
            {/* 본인 LP인 경우 수정/삭제 메뉴 */}
            {currentUserId && lp.authorId === currentUserId && (
              <div className="relative">
                <button
                  onClick={() => setShowLpMenu(!showLpMenu)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="메뉴"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>

                {showLpMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg py-1 z-10 min-w-[100px]">
                    <button
                      onClick={handleLpEditClick}
                      className="w-full px-4 py-2 text-left text-white hover:bg-[#2a2a2a] transition-colors"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleLpDelete}
                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#2a2a2a] transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsCommentModalOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="댓글"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* LP 이미지 */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="aspect-square rounded-full overflow-hidden bg-[#1a1a1a] border-4 border-[#2a2a2a]">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* 본문 */}
        <div className="mb-8">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {lp.content}
          </p>
        </div>

        {/* 태그 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1.5 bg-[#1a1a1a] text-gray-300 text-sm rounded-full hover:bg-[#2a2a2a] transition-colors cursor-pointer"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* 좋아요 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              isLiked
                ? "bg-pink-500 text-white"
                : "bg-[#1a1a1a] text-pink-500 hover:bg-pink-500 hover:text-white"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-lg font-semibold">{likesCount}</span>
          </button>
        </div>
      </div>

      {/* 댓글 모달 */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
              <h2 className="text-xl font-bold text-white">댓글</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCommentOrder(PAGINATION_ORDER.asc)}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      commentOrder === PAGINATION_ORDER.asc
                        ? "bg-white text-black"
                        : "bg-[#2a2a2a] text-gray-300 hover:text-white hover:bg-[#3a3a3a]"
                    }`}
                  >
                    오래된순
                  </button>
                  <button
                    onClick={() => setCommentOrder(PAGINATION_ORDER.desc)}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      commentOrder === PAGINATION_ORDER.desc
                        ? "bg-white text-black"
                        : "bg-[#2a2a2a] text-gray-300 hover:text-white hover:bg-[#3a3a3a]"
                    }`}
                  >
                    최신순
                  </button>
                </div>
                <button
                  onClick={() => setIsCommentModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 댓글 목록 (스크롤 가능) */}
            <div ref={commentScrollRef} className="flex-1 overflow-y-auto p-6">
              {isCommentsLoading || showCommentSkeleton ? (
                // 초기 로딩 스켈레톤 (최소 1.5초 표시)
                <div className="space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <CommentSkeleton key={i} />
                  ))}
                </div>
              ) : allComments.length > 0 ? (
                <>
                  <div>
                    {allComments.map((comment) => {
                      const isMyComment = comment.authorId === currentUserId;
                      const isEditing = editingCommentId === comment.id;

                      return (
                        <div
                          key={comment.id}
                          className="py-4 border-b border-[#2a2a2a] last:border-0"
                        >
                          <div className="flex items-start gap-3">
                            {/* 프로필 이미지 */}
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {comment.author?.name?.charAt(0) || "U"}
                            </div>

                            <div className="flex-1">
                              {/* 사용자 이름과 시간 */}
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-medium">
                                  {comment.author?.name || "익명"}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatCommentDate(comment.createdAt)}
                                </span>
                              </div>

                              {/* 댓글 내용 또는 수정 입력 필드 */}
                              {isEditing ? (
                                <div className="flex gap-2 mt-2">
                                  <input
                                    type="text"
                                    value={editingContent}
                                    onChange={(e) =>
                                      setEditingContent(e.target.value)
                                    }
                                    className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleEditSubmit(comment.id)}
                                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors text-sm"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={handleEditCancel}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <p className="text-gray-300 leading-relaxed">
                                  {comment.content}
                                </p>
                              )}
                            </div>

                            {/* 더보기 버튼 (본인 댓글인 경우만 표시) */}
                            {isMyComment && !isEditing && (
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    setShowMenuCommentId(
                                      showMenuCommentId === comment.id
                                        ? null
                                        : comment.id
                                    )
                                  }
                                  className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <circle cx="12" cy="5" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="12" cy="19" r="2" />
                                  </svg>
                                </button>

                                {/* 수정/삭제 메뉴 */}
                                {showMenuCommentId === comment.id && (
                                  <div className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md shadow-lg py-1 z-10 min-w-[100px]">
                                    <button
                                      onClick={() =>
                                        handleCommentEdit(comment.id)
                                      }
                                      className="w-full px-4 py-2 text-left text-white hover:bg-[#2a2a2a] transition-colors"
                                    >
                                      수정
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleCommentDelete(comment.id)
                                      }
                                      className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#2a2a2a] transition-colors"
                                    >
                                      삭제
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 무한 스크롤 트리거 */}
                  <div ref={commentObserverTarget} className="h-10 w-full" />

                  {/* 추가 로딩 스켈레톤 (최소 1초 표시) */}
                  {(isFetchingNextPage || showNextPageSkeleton) && (
                    <div className="space-y-4 mt-4">
                      {[...Array(10)].map((_, i) => (
                        <CommentSkeleton key={`next-${i}`} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                // 댓글이 없을 때
                <div className="text-center py-12 text-gray-400">
                  <p className="text-lg mb-2">첫 댓글을 남겨보세요!</p>
                  <p className="text-sm">LP에 대한 의견을 공유해주세요</p>
                </div>
              )}
            </div>

            {/* 댓글 작성란 (모달 하단) */}
            <div className="p-6 border-t border-[#2a2a2a]">
              <form onSubmit={handleCommentSubmit}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                      setCommentError("");
                    }}
                    placeholder="댓글을 입력해주세요"
                    disabled={createCommentMutation.isPending}
                    className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={createCommentMutation.isPending}
                    className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createCommentMutation.isPending ? "작성 중..." : "작성"}
                  </button>
                </div>
                {commentError && (
                  <p className="mt-2 text-sm text-red-400">{commentError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* LP 수정 모달 */}
      <EditLpModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={editLpTitle}
        content={editLpContent}
        tags={editLpTags}
        thumbnailUrl={editPreviewUrl}
        onSubmit={handleLpEditSubmit}
        isLoading={updateLpMutation.isPending || uploadImageMutation.isPending}
      />
    </div>
  );
}
