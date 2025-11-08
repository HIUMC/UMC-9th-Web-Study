import { Link } from 'react-router-dom'

const FloatingButton = () => {
  return (
    <button className='flex justify-center items-center text-3xl bg-gray-500 rounded-full size-14 fixed bottom-6 right-6'>
      <Link to={'#'}>
        <span>+</span>
      </Link>
    </button>
  )
}

export default FloatingButton
