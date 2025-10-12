import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email '', password ''}
  //값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
} //속성들을 가져오는 것

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  //사용자가 입력값을 바꿀 때 실행되는 함수이다.
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

  //values가 변경될 때 마다 에러 검증 로직이 실행됨.
  // {email " ", password " "}
  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  //이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };
    const onBlur = () => {
      handleBlur(name);
    };

    return {
      value,
      onChange,
      onBlur,
    };
  };

  return { values, errors, touched, getInputProps };
}

export default useForm;
