interface SignupInputProps {
  name:string;
  type:string;
  placeholder:string;
  register:any;
  error?:string;
  touched?:boolean;
}

export default function SignupInputForm({name,type,placeholder,register,error,touched}:SignupInputProps){
  return (
    <>
      <input 
        {...register(name)}
        name={name}
        type={type} 
        className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
        ${error ? "border-red-500 bg-red-200":"border-gray-300"}`}
        placeholder={placeholder}
      />
      {error && <div className='text-red-500 text-sm'>{error}</div>}
    </>
  )
}
 