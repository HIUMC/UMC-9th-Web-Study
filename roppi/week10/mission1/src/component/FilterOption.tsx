import AdultToggle from "./AdultToggle";
import LanguageOption from "./LanguageOption";

interface FilterOptionProps { 
  isAdult: boolean;
  language: string;
  setIsAdult: (value: boolean) => void;
  setLanguage?: (value: string) => void;
  setFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const FilterOption = ({setFilterModal, isAdult, language, setLanguage, setIsAdult} : FilterOptionProps) => {
  const handleApply = () => {
    setFilterModal(false);
  }

  return (

  <div className="fixed z-100 inset-0 w-full h-full flex items-center justify-center bg-[#000000]/60 backdrop-blur-sm">
    <div className="bg-[#ffffff] w-[400px] h-[400px] flex flex-col items-center justify-between pb-[10px]">
      <div className="w-full flex flex-col items-center">

        <h3 className="text-[30px]">Filter</h3>

        <div className="w-[calc(100%-40px)] mx-[20px] flex flex-col gap-[20px] my-[20px]">

          {/* Adult content Option 컴포넌트 */}
          <div className="flex items-center justify-between">
            <span className="">Adult Content</span>
            <AdultToggle  enabled={isAdult} setEnabled={setIsAdult}/>
          </div>

          {/* Language Option 컴포넌트 */}
          <LanguageOption language={language} setLanguage={setLanguage} />
        </div>

      </div>


      <button
        type="button"
        onClick={handleApply}
        className="border-none bg-[#ffffff] px-[8px] py-[10px] cursor-pointer"
      >APPLY</button>
    </div>
  </div>
  )
}

export default FilterOption