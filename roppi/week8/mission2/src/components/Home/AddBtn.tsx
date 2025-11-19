interface modal {
setIsModal : () => void;
isModal? : boolean
}

const AddBtn = ({ setIsModal }: modal) => {
  return (
    <button
      type="button"
      aria-label="추가"
      className="fixed bottom-20 right-10 bg-[#e52582] w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md hover:brightness-90 active:scale-95 transition cursor-pointer"
      onClick={setIsModal}
    >
      +
    </button>
  )
}

export default AddBtn;