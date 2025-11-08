import { useEffect, useState } from "react";
import useLpAdd from "../hooks/mutations/useAddLp";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateLpsDto } from "../types/lp";
// 1. 새로 만든 이미지 업로드 훅 import
import useImageUpload from "../hooks/mutations/useImageUpload"; 
import { LoadingSpinner } from "./LoadingSpinner";

const LpAdd = ({ isOpen, onClose }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputTag, setInputTag] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // 로컬 미리보기 URL

    // 2. 서버로부터 받은 *실제* 썸네일 URL을 저장할 state
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

    // 3. 이미지 업로드 mutation (POST /v1/uploads)
    const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
        onSuccessCallback: (data) => {
            // 업로드 성공 시 반환된 URL(data.imageUrl)을 state에 저장
            console.log("이미지 업로드 성공! 서버 응답:", data);
            setThumbnailUrl(data.data.imageUrl); // 👈 핵심: 서버 URL 저장
        },
        onErrorCallback: (error) => {
            console.error("이미지 업로드 실패:", error);
            alert("이미지 업로드에 실패했습니다.");
            // 실패 시 미리보기와 파일 초기화
            setSelectedFile(null);
            setImagePreview(null);
        }
    });

    // 4. LP 생성 mutation (POST /v1/lps)
    const { mutate: AddLpMutate } = useLpAdd({
        onSuccessCallback: () => {
            onClose(); // API 호출 성공 시 모달 닫기
        }
    });

    const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
        setTags([...tags, inputTag]);
        setInputTag(''); // 태그 입력창 초기화
        console.log(tags)
    }};
    const handleRemoveTag = (tagToRemove) => {
    // tagToRemove와 일치하지 않는 태그만 필터링하여 새 배열 생성
    setTags(tags.filter(tag => tag !== tagToRemove));
    };


    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            lptitle: '',
            lpcontent: '',
        }
    });

    // 5. 모달이 닫힐 때 state 초기화 (thumbnailUrl 추가)
    useEffect(() => {
        if (!isOpen) {
            setSelectedFile(null);
            setImagePreview(null);
            setThumbnailUrl(null); // 👈 서버 URL도 초기화
            setTags([]);
            setInputTag('');
            reset();
        }
    }, [isOpen, reset]);

    // 파일 input 변경 시 실행될 핸들러
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // 로컬 미리보기 URL 생성 
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // 이전 업로드 URL이 있다면 초기화
            setThumbnailUrl(null); 
            
            // FormData 생성 및 서버 업로드 *즉시* 시작
            const formData = new FormData();
            formData.append("file", file); 
            uploadImage(formData);
        }
    };

    // 7. 폼 제출 핸들러 
    const onSubmit: SubmitHandler<{ lptitle: string, lpcontent: string }> = async (data) => {
        
        // 이미지 업로드가 아직 진행 중인지 확인
        if (isUploading) {
            alert("이미지가 아직 업로드 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        // 서버 URL을 성공적으로 받았는지 확인
        if (!thumbnailUrl) {
            alert("이미지 업로드에 실패했거나 이미지가 선택되지 않았습니다.");
            return;
        }

        // LP 생성용 (JSON) 페이로드 생성
        const payload: CreateLpsDto = {
            title: data.lptitle,
            content: data.lpcontent,
            tags,
            published: true, 
            // 썸네일 필드에 서버 URL을 삽입
            thumbnail: thumbnailUrl,
        };

        // JSON 페이로드를 뮤테이션으로 전송
        AddLpMutate(payload);
    };

    return (
        <div>
            <label className="w-32 h-32 mb-6 cursor-pointer rounded-full flex justify-center items-center bg-gray-700 overflow-hidden">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading} 
                />
                
                {isUploading ? (
                    <LoadingSpinner/>
                ) : imagePreview ? (
                    <img
                        src={imagePreview} 
                        alt="LP Preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img src="../../public/images/lp.png"></img>
                )}
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-wrap gap-2">
                <input 
                    placeholder="LP Name"
                    {...register("lptitle")}
                />
                <input 
                    placeholder="LP Content"
                    {...register("lpcontent")}
                />
                <div className="flex gap-2">
                    <input 
                        placeholder="LP Tag"
                        type="text"
                        value={inputTag}
                        onChange={(e) => setInputTag(e.target.value)}
                        ></input>
                    <button 
                        type="button"
                        className="cursor-pointer"
                        onClick={handleAddTag}
                        >
                            Add
                    </button>
                </div>
                <div className="flex flex-warp gap-2">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex flex-row border-1 border-fuchsia-200  py-1 rounded-sm text-sm gap-2 p-2">
                            <div>{tag}</div>
                            <button onClick={() => handleRemoveTag(tag)} className="font-bold">X</button>
                        </div>
                            
                    ))}
                        
                </div>
                
                <button
                    type="submit"
                    className="cursor-pointer border-2 border-fuchsia-200"
                    disabled={isUploading} 
                >
                    {isUploading ? "이미지 업로드 중..." : "Add Lp"}
                </button>
            </form>
        </div>
    )
}

export default LpAdd;