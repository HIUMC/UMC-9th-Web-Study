interface FilterBtnProps {
  setFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterBtn = ({setFilterModal} : FilterBtnProps) => { 
  const handleModal = () => {
    setFilterModal(prev => !prev);
  }

  return (
    <button   
      type="button"
      onClick={handleModal}
      className="bg-[#ffffff] cursor-pointer text-center px-[10px] py-[8px] border-none hover:bg-[black] hover:text-[#ffffff]">FILTER</button>
  )
}

export default FilterBtn  