// App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import InfinitePostsJsonPlaceholder from "./components/InfinitePostsJsonPlaceholder";
import InfinitePostsAutoJsonPlaceholder from "./components/InfinitePostsAutoJsonPlaceholder";

// 1. QueryClient 인스턴스 생성
//    이 객체가 모든 쿼리 상태를 관리해요
const queryClient = new QueryClient(); // React Query의 중앙관리객체 생성

const App = () => {
  return (
    // 2. Provider로 앱을 감싸기
    //    이제 하위 컴포넌트에서 React Query를 사용할 수 있어요
    // React Context처럼 하위 컴포넌트에 기능 전달
    <QueryClientProvider client={queryClient}>
      {/* 여기에 여러분의 컴포넌트들이 들어가요 */}
      {/* <InfinitePostsJsonPlaceholder /> */}
      <InfinitePostsAutoJsonPlaceholder />

      {/* 3. 개발 도구 추가 (개발 환경에서만 보여요) */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {/* import.meta.env.DEV -> Vite 환경변수로 개발모드일때만 true */}
    </QueryClientProvider>
  );
};

export default App;
