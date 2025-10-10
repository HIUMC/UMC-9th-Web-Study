export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center mt-5">
      <h1 className="text-3xl text-red-400 text-center">오류 발생!</h1>
      <p className="text-lg text-center">지정된 경로를 찾을 수 없습니다.</p>
    </div>
  )
}