export type UserSignInformation = {
  email: string;
  password: string;
}

function validateUser(values : UserSignInformation){
  const errors = {
    email: "",
    password: "",
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(values.email,)){
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  //비밀번호 8자 28자 사이
  if(!(values.password.length >=8 && values.password.length <= 28)){
    errors.password = "비밀번호는 8자~28자 사이로 입력해주세요.";
  }

  return errors;
} 

// 로그인 유효성 검사
// 지금 당장은 validateSignin()이 불필요해 보여도,
// 미래에 다른 검증 로직이 추가될 때 코드를 깔끔하게 유지하기 위한 설계 패턴

function validateSignin(values: UserSignInformation){
  return validateUser(values);
}

export {validateSignin}