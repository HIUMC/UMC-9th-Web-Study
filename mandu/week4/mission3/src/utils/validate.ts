export type UserSigninInformation = {
  email: string;
  password: string;
};

export type UserSingupInformation = {
  password: string;
  confirmpw: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

function valdiateUserPw(values: UserSingupInformation) {
  const errors = {
    password: "",
    confirmpw: "",
  };

  if (!(values.password.length >= 8 && values.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  if (!(values.confirmpw.length >= 8 && values.confirmpw.length < 20)) {
    errors.confirmpw = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  if (values.password !== values.confirmpw) {
    errors.confirmpw = "비밀번호가 일치하지 않습니다.";
  }

  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

// 비밀번호 유효성 검사
function validatePw(values: UserSingupInformation) {
  return valdiateUserPw(values);
}

export { validateSignin, validatePw };
