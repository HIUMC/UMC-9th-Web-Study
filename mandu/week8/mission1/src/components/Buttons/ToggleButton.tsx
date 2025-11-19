import type { Dispatch, SetStateAction } from "react";

interface ToggleButtonProps {
  asc: boolean;
  setAsc: Dispatch<SetStateAction<boolean>>;
}

const ToggleButton = ({ asc, setAsc }: ToggleButtonProps) => {
  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 border-white-600
              ${
                !asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(false)}
          >
            오래된 순
          </button>
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 border-white-600
              ${
                asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(true)}
          >
            최신 순
          </button>
        </div>
      </div>
    </>
  );
};

export default ToggleButton;
