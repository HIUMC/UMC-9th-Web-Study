import { useEffect, useState, type ChangeEvent } from "react";

interface UseFormProps<T> {
  intialValue: T; // (email : ~~~, password : ~~~) -> 입력창에 입력한 email, pw 값 전달
  validate: (values: T) => Record<keyof T, string>; // 전달받은 email, pw 값이 맞는지 체크한다. + 값이 올바른지 체크하는 함수
}

// 상태 관리를 객체로도 표현할 수 있는데 이걸 hook으로 옮겼다고 생각하자.
export default function UseForm<T>({ intialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(intialValue);
  // 아무것도 입력 안했는데, 처음부터 에러 메시지를 보여주면 안됨 -> 그래서 로그인을 눌렀는지 안눌렀는지 보여주는 상태를 사용하자
  const [touched, setTouched] = useState<Record<string, boolean>>();
  /*
    {
        "email" : false, // email 부분은 터치가 안된 것
        "password" : true, // pw 부분은 터치가 된 것
    }
    -> 따라서 Record로 묶어서 표현(key는 string, value는 boolean)
    */
  const [errors, setErrors] = useState<Record<string, string>>();
  /*
    {
        "email" : "반드시 @를 포함해야 합니다."" 
    }
    -> 따라서 Record로 묶어서 표현(key는 string, value도 string)
    */

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // email 인풋, pw 인풋, 속성들을 좀 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };
    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 때마다 에러 검증 로직이 실행되어야 함.
  // {email : "이메일 형식이 아닙니다."} -> 객체에 값을 넣어줘야함
  // 변경될때마다 로직이 실행 -> useEffect
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류 메시지 업데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}
