import { X } from "lucide-react"
import lpDefaultImage from "../assets/lp_default.png"
import { useRef, useState } from "react"
import { useModal } from "../context/ModalContext"
import type { Tag } from "../types/lp"
import usePostCreateLp from "../hooks/mutations/usePostCreateLp"
import { postUploads } from "../apis/lp"

export const AddLpModal = () => {
  const {isAddLpModalOpen, closeAddLpModal} = useModal();

  if (!isAddLpModalOpen) return null;

  const [nameInput, setNameInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(lpDefaultImage);

  const {mutate: createLpMutate} = usePostCreateLp();

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };

  const handleContentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentInput(e.target.value);
  }

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if(tags.some(tag => tag.name === tagInput)) {
      alert("이미 추가한 태그입니다.")
      setTagInput("")
      return;
    }
    if(tags.length >= 10) {
      alert("태그는 한 번에 10개까지 추가할 수 있습니다.")
      setTagInput("")
      return;
    }
    setTags((prev) => [...prev, {
      id: prev.length,
      name: tagInput.trim(),
    }])
    setTagInput("")
  }

  const handleDeleteTag = (id: number) => {
    if(tags.some(tag => tag.id === id)) {
      setTags((prev) => prev.filter(tag => tag.id !== id))
    }
  }

  const ref = useRef<HTMLInputElement>(null);

  const handleLpImageClick = () => {
    if(ref.current) {
      ref.current.click();
    }
  }

  const handleLpImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);
    if(!file) {
      alert("파일을 선택하지 않았습니다.")
      return;
    }
    handleUploadImage(formData);
  }

  const handleCreateLp = () => {
    createLpMutate({
      title: nameInput,
      content: contentInput,
      thumbnail: thumbnailUrl,
      tags: tags.map(tag => tag.name),
      published: true,
    })
    closeAddLpModal();
  }

  const handleUploadImage = async(formData: FormData) => {
    const {data} = await postUploads(formData);
    if(data.imageUrl) {
      setThumbnailUrl(data.imageUrl);
    }
  }

  const disabledButtonStyle = `bg-[#8a8a8a] cursor-not-allowed`
  const enabledButtonStyle = `bg-[#FF1E9D] cursor-pointer`

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-30" 
        onClick={closeAddLpModal}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] bg-[#222222] rounded-2xl z-40">
        <div className="flex flex-row justify-end mt-6 mr-6">
          <X className="cursor-pointer" color="white" onClick={closeAddLpModal}/>
        </div>
        <div className="flex flex-row justify-center my-10">
          <button onClick={handleLpImageClick}>
            <img className={`h-[250px] w-[250px] cursor-pointer rounded-full ${(thumbnailUrl !== lpDefaultImage) && `border-1 border-black`}`} src={thumbnailUrl} alt="" />
            <input type="file" ref={ref} accept="image/*" className="hidden" onChange={handleLpImageChange}/>
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <div>
            <input onChange={handleNameInputChange} type="text" className="border-1 border-[#8a8a8a] rounded-md h-[35px] p-2 placeholder:text-[#8a8a8a] w-full text-white" placeholder="LP Name"/>
          </div>
          <div>
            <input onChange={handleContentInputChange}  type="text" className="border-1 border-[#8a8a8a] rounded-md h-[35px] p-2 placeholder:text-[#8a8a8a] w-full text-white" placeholder="LP Content"/>
          </div>
          <div className="flex flex-row justify-between items-center space-x-2">
            <input onChange={handleTagInputChange} type="text" className="border-1 border-[#8a8a8a] rounded-md h-[35px] p-2 placeholder:text-[#8a8a8a] w-full text-white" placeholder="LP Tag" value={tagInput}/>
            <button className={`${tagInput.trim() ? enabledButtonStyle : disabledButtonStyle} h-[35px] p-3 rounded-md flex flex-col justify-center items-center`} onClick={handleAddTag}>
              <p className="text-white">Add</p>
            </button>
          </div>
          <div className="w-full flex flex-wrap items-center gap-3">
            {tags.map((tag) => (
              <div key={tag.id} className="border-1 border-[#8a8a8a] flex flex-row rounded-md text-[#dfdfdf] p-1">
                <p className="mx-1">{tag.name}</p>
                <X className="scale-80" onClick={() => handleDeleteTag(tag.id)}/>
              </div>
            ))}
          </div>
          <div>
            <button className={`${(nameInput.trim() && contentInput.trim()) && tags.length ? enabledButtonStyle : disabledButtonStyle} w-full h-[40px] mt-2 rounded-md flex flex-col justify-center items-center text-white`} onClick={handleCreateLp}>
              <p>Add LP</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}