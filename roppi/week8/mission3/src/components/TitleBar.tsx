import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface PageTitleProps {
  children : ReactNode;
}

const TitleBar = ({children} : PageTitleProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="relative w-[230px] text-white text-bold flex justify-center p-[5px]">
        <div 
        className="absolute left-[10px] bottom-[6px] cursor-pointer"
        onClick={handleBack}
        >{'<'}</div>
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </>
  )
};

export default TitleBar;