const FloatingButton = ({onClick}: {onClick: () => void}) => {
  return (
    <button 
    className='flex justify-center items-center text-3xl bg-gray-500 rounded-full size-14 fixed bottom-6 right-6'
    onClick={onClick}
    >
      <span>+</span>
    </button>
  )
}

export default FloatingButton
