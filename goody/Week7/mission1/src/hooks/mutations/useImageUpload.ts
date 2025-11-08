// hooks/mutations/useImageUpload.ts (새 파일)

import { useMutation } from "@tanstack/react-query";
import type { UploadResponse } from "../../types/lp";
import { uploadImage } from "../../apis/lp";


interface UseImageUploadProps {
    onSuccessCallback?: (data: UploadResponse) => void;
    onErrorCallback?: (error: Error) => void;
}


// 이미지 업로드(FormData)를 위한 useMutation 커스텀 훅

function useImageUpload({ onSuccessCallback, onErrorCallback }: UseImageUploadProps = {}) {
    return useMutation({
        // mutationFn: FormData를 인자로 받아 Promise를 반환하는 API 함수
        mutationFn: (formData: FormData) => uploadImage(formData),
        
        onSuccess: (data) => {
            console.log("React Query: 이미지 업로드 성공", data);
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }
        },
        onError: (error: Error) => {
            console.error("React Query: 이미지 업로드 실패:", error);
            if (onErrorCallback) {
                onErrorCallback(error);
            }
        }
    });
}

export default useImageUpload;