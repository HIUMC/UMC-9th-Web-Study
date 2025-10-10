import googleLogo from "../assets/googleLogo.png";

const handleGoogleLogin = () => {
  console.log("구글 로그인 시도");
};

const GoogleLoginButton = () => {
  return (
    <button
      onClick={handleGoogleLogin}
      className="grid grid-cols-3 w-full border items-center justify-center border-[#ccc] text-white p-[10px] rounded-sm bg-transparent"
    >
      <img src={googleLogo} alt="google logo" className="w-5 h-5" />
      <span>구글 로그인</span>
    </button>
  );
};

export default GoogleLoginButton;
