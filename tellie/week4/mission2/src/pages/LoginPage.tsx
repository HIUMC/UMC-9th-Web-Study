import useForm from '../hooks/useForm';
import { type UserSigninInformation, validateSignin } from '../utils/validate';
import BackButton from '../components/Backbutton';
import LoginHeader from '../components/LoginHeader';

const LoginPage = () => {
    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>( {
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateSignin,
    });

    const handleSubmit = () => {
        console.log(values);
    }

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
        Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
        Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
            <LoginHeader />
            <div className = 'flex items-center justify-center pt-16 min-h-screen w-full'>
                <form onSubmit={handleSubmit}
                className = 'relative flex flex-col items-center'>
                    <div className = 'w-full flex items-center justify-between relative mb-4'>
                        <BackButton className='text-gray-400 hover:text-white' />
                        <h1 className = 'text-2xl font-semibold absolute left-1/2 text-white transform -translate-x-1/2'>로그인</h1>
                        <div className = 'w-6'></div>
                    </div>                    
                    <button type='button'
                    className='w-full bg-transparent border border-gray-700 text-white py-3 rounded-md 
                    hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2'>
                        <img src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='Google' className='w-5 h-5'/>
                        <span>구글 로그인</span>
                    </button>
                    <div className = 'w-full flex items-center my-4'>
                        <div className='flex-grow border-t border-gray-700'></div>
                        <span className='flex-shrink mx-4 text-gray-500'>OR</span>
                        <div className='flex-grow border-t border-gray-700'></div>
                    </div>

                    <div className = 'flex flex-col gap-5 w-full'>
                        <input 
                            {...getInputProps('email')}
                            className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.email && touched?.email ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"email"} 
                            placeholder = {"이메일"}
                        />
                        {errors?.email && touched?.email &&
                        (<div className = 'text-red-500 text-sm'>{errors.email}</div>)}
                    
                        <input 
                            {...getInputProps('password')}
                            className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.password && touched?.password ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"password"} 
                            placeholder = {"비밀번호"}
                        />
                        {errors?.password && touched?.password &&
                        (<div className = 'text-red-500 text-sm'>{errors.password}</div>)}
                    </div>

                    <div className = 'w-full pt-5'>
                        <button 
                            type='button' 
                            onClick={handleSubmit} 
                            disabled={isDisabled} 
                            className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                        >로그인</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default LoginPage
