/// <reference types="vite/client" />
// 이 파일은 Vite 프로젝트에서 .env 환경 변수의 타입을 TypeScript에게 알려주는 타입 선언

// .env 안에서 VITE_TMDB_KEY 라는 키가 있고 값은 문자열이라는 것을 명시
// readonly → 값을 직접 바꿀 수 없음을 의미.
interface ImportMetaEnv {
  readonly VITE_TMDB_KEY : string;
}


// import.meta.env 의 타입을 위에서 만든 ImportMetaEnv 로 확장
// 이렇게 하면 코드에서 import.meta.env.VITE_TMDB_KEY 입력 시 자동완성 + 타입체크가 작동
interface ImportMeta {
  readonly env : ImportMetaEnv;
}