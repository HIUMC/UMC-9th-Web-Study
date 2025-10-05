import React from 'react'

// 재사용 컴포넌트로 만드려면 interface 하고 Props로 값 받아오기...

interface InputFormProps {
  name:string;
  type:string;
  placeholder:string;
// 객체타입 표시 : (name: string) => React.InputHTMLAttributes<HTMLInputElement>
// name이라는 매개변수를 받고 객체 타입을 반환
  getInputProps:(name:any)=>React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  touched?:boolean;
}

export default function InputForm({name,type,placeholder,getInputProps,error,touched}:InputFormProps) {

  return (
    <>
      <input 
        {...getInputProps(name)}
          name={name}
          type={type} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${error && touched ? "border-red-500 bg-red-200":"border-gray-300"}`}
          placeholder={placeholder}
      />
      {error && touched && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </>
  )
}
