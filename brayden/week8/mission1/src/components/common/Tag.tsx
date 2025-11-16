interface TagList {
  id: number;
  name: string;
}

interface TagProps {
  tagList: (TagList | string)[];
  isTagModifying?: boolean;
  onTagModified?: (tag: string) => void; // 어떤 태그가 수정(삭제)되는지도 넘기면 유용
}

const Tag = ({ tagList, isTagModifying = false, onTagModified }: TagProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-3 py-2">
      {tagList.map((tag, index) => {
        const tagName = typeof tag === "string" ? tag : tag.name;
        const tagKey = typeof tag === "string" ? tag : tag.id ?? index;

        return (
          <div
            key={tagKey}
            className="flex flex-row items-center px-4 py-1 text-white rounded-full text-sm bg-[#364153]"
          >
            <span>#{tagName}</span>

            {isTagModifying && (
              <button
                onClick={() => onTagModified?.(tagName)}
                className="ml-2 text-gray-300 hover:text-red-400 transition"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tag;
