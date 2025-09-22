
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";

export const ContextPage = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1 w-full">
            <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  )
}

// flex-1 은 flex item(자식 요소)이 가능한 공간을 꽉 채워 차지