import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Modal from "../ModalComponent/Modal";
import { useState } from "react";
import InputComponent from "../ModalComponent/InputComponent";
import ImgSelector from "../ModalComponent/ImgSelector";
import Tag from "../common/Tag";
import AddButton from "../common/AddButton";
import LpImg from "../../assets/LpImg.png";
import usePostImg from "../../hooks/mutations/usePostImg";
import usePostLp from "../../hooks/mutations/usePostLp";

export default function FloatingButton() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // 입력 상태 저장
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login", { replace: true });
      return;
    }
    setIsOpen(true);
  };

  const { mutate: createLp } = usePostLp();
  const { mutate: uploadImg, isPending: isUploading } = usePostImg();

  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setContent("");
    setTagInput("");
    setTags([]);
    setSelectedFile(null);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const handleTag = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTagInput(e.target.value);

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput)) return;
    setTags((prev) => [...prev, tagInput]);
    setTagInput("");
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = () => {
    if (!title || !content || !selectedFile) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    uploadImg(selectedFile, {
      onSuccess: (thumbnailUrl) => {
        const body = {
          title,
          content,
          tags,
          thumbnail: thumbnailUrl,
          published: true,
        };

        createLp(body, {
          onSuccess: () => {
            alert("LP가 성공적으로 생성되었습니다!");
            setIsOpen(false);
            setTitle("");
            setContent("");
            setTags([]);
          },
        });
      },
    });
  };

  return (
    <>
      <button
        className="
        fixed bottom-6 right-6
        bg-pink-600 hover:bg-pink-700
        text-white rounded-full
        w-14 h-14 flex items-center justify-center
        shadow-lg
        transition-all duration-300 z-100 cursor-pointer
      "
        onClick={handleClick}
      >
        <Plus size={25} />
      </button>
      {isOpen && (
        <Modal onClick={closeModal}>
          <div className="flex flex-col items-center w-xs z-100">
            <ImgSelector
              defaultImg={LpImg}
              onChange={(file) => setSelectedFile(file)}
            />

            <div className="flex flex-col w-full gap-4">
              <InputComponent
                value={title}
                inputComment="LP Name"
                onChange={handleTitle}
              />
              <InputComponent
                value={content}
                inputComment="LP Content"
                onChange={handleContent}
              />

              <div className="flex flex-row gap-2">
                <InputComponent
                  value={tagInput}
                  inputComment="LP Tag"
                  onChange={handleTag}
                  onEnterPress={handleAddTag}
                />
                <AddButton onClick={handleAddTag} buttonText="Add" />
              </div>
              <div className="flex flex-col">
                {tags.length > 0 && (
                  <Tag
                    tagList={tags}
                    isTagModifying={true}
                    onTagModified={handleDeleteTag}
                  />
                )}
              </div>
              <AddButton
                onClick={handleSubmit}
                buttonText={isUploading ? "Uploading..." : "Add LP"}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
