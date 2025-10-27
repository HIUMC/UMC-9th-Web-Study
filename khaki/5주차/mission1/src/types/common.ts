// <백엔드와 통신할 때 사용하는 공통 타입 정의>

export type CommonResponse<T> = {
  status : boolean
  statusCode : number
  message : string
  data : T
}