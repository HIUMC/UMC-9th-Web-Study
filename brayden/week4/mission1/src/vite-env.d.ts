/// <reference types="vite/client" />
// 환경변수
// api 토큰 값 등 보여주면 안되는 값들을 환경변수로 등록함
interface ImportMetaEnv {
  readonly VITE_TMDB_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
