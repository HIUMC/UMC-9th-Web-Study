import { useRef, useState } from "react";

interface ImgSelectorProps {
  onChange?: (file: File | null) => void;
  defaultImg?: string;
  className?: string;
}

const ImgSelector = ({ onChange, defaultImg, className }: ImgSelectorProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange?.(file);
    }
  };
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 클릭 가능한 이미지 */}
      <img
        src={preview || defaultImg}
        alt="이미지 업로드"
        width={200}
        height={200}
        onClick={handleImgClick}
        className="cursor-pointer rounded-lg mb-10"
      />

      {/* 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        width={200}
        height={200}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImgSelector;
