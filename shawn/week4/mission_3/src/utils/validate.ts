export type UserSigninInformation = {
  email: string;
  password: string;
};

export const validateUser = (values: UserSigninInformation) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(values.email)) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }
  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = "비밀번호는 8자 이상 20자 이하여야 합니다.";
  }

  return errors;
};

//로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export { validateSignin };
