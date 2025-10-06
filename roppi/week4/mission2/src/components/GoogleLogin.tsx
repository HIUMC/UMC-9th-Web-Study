import logo from '../assets/구글로고.svg'


const GoogleLogin = () => {
  return (
        <button className="flex relative gap-2 justify-center items-center text-white w-full border rounded-md py-[7px] cursor-pointer">
          <img src={logo} className='w-[20px] absolute left-[8px]'/>
          <span className="text-[12px]">구글 로그인</span>
        </button>
  )
};

export default GoogleLogin;