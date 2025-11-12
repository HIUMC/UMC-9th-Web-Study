// import  { useState } from "react";

// const TagInputSection = () => {
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState<string[]>([]);

//   const handleAddTag = () => {
//     const trimmed = tagInput.trim();
//     if (!trimmed || tags.includes(trimmed)) return;
//     setTags((prev) => [...prev, trimmed]);
//     setTagInput("");
//   };

//   const handleRemoveTag = (tagToRemove: string) => {
//     setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
//   };

//   return (
//     <div className="flex flex-col gap-3 w-full">
//       <input
//         className="outline-white text-white  border-[0.5px] border-[#8b919a] opacity-50 rounded placeholder:text-[#8b919a] p-1"
//         placeholder="Lp name"
//       />
//       <input
//         className="outline-white text-white border-[0.5px] border-[#8b919a] opacity-50 rounded placeholder:text-[#8b919a] p-1"
//         placeholder="Lp Content"
//       />

//       {/* 태그 입력 + 추가 버튼 */}
//       <div className="flex gap-2">
//         <input
//           value={tagInput}
//           onChange={(e) => setTagInput(e.target.value)}
//           className="outline-white text-white border-[0.5px] border-[#8b919a] opacity-50 rounded placeholder:text-[#8b919a] p-1 flex-1"
//           placeholder="Lp Tag"
//         />
//         <button
//           onClick={handleAddTag}
//           className="w-15 cursor-pointer rounded bg-[#8b919a] text-white px-3 hover:opacity-80 transition"
//         >
//           Add
//         </button>
//       </div>

//       {/*  태그 리스트 표시 */}
//       <div className="flex flex-wrap gap-2 mt-2">
//         {tags.map((tag) => (
//           <div
//             key={tag}
//             className="flex items-center gap-1 bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
//           >
//             <span>#{tag}</span>
//             <button
//               onClick={() => handleRemoveTag(tag)}
//               className="text-gray-300 hover:text-red-400 ml-1"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default TagInputSection;

import { useState } from "react";
import type { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

interface LpFormData {
  tags: { value: string }[];
}

interface TagInputSectionProps {
  fields: FieldArrayWithId<LpFormData, "tags", "id">[];
  append: UseFieldArrayAppend<LpFormData, "tags">;
  remove: UseFieldArrayRemove;
}

const TagInputSection = ({ fields, append, remove }: TagInputSectionProps) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (fields.some((tag) => tag.value === trimmed)) return;
    append({ value: trimmed });
    setTagInput("");
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 태그 입력 */}
      <div className="flex gap-2">
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
          placeholder="LP Tag"
          className="outline-none text-white border border-[#8b919a] opacity-70 rounded placeholder:text-[#8b919a] p-2 flex-1"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="w-15 px-3 cursor-pointer rounded bg-[#8b919a] text-white hover:opacity-80 transition"
        >
          Add
        </button>
      </div>

      {/* 태그 리스트 */}
      <div className="flex flex-wrap gap-2 mt-2">
        {fields.map((tag, index) => (
          <div
            key={tag.id}
            className="flex items-center gap-1 bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
          >
            <span>#{tag.value}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-gray-300 hover:text-red-400 ml-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagInputSection;
