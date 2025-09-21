import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";

function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div
      className={`h-screen flex justify-center items-start transition-colors duration-500 ease-in-out ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`font-sans p-8 rounded-xl shadow-md w-[500px] my-32 text-center 
          transition-colors duration-500 ease-in-out
          ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <h1
          className={`text-2xl font-bold mb-6 transition-colors duration-500 ease-in-out ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Shawn Todo
        </h1>
        {/* <div className="text-5xl text-blue-500 dark:text-red-500">test</div> */}

        {/* 다크모드 토글 버튼 */}
        <button
          onClick={toggleDarkMode}
          className={`mb-6 px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-300 ease-in-out
            ${
              darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-200 text-gray-800"
            }`}
        >
          {darkMode ? "🌙 다크모드" : "☀️ 라이트모드"}
        </button>

        <TodoForm />
        <div className="flex justify-between gap-4">
          <TodoSection title="할일" isDone={false} />
          <TodoSection title="완료" isDone={true} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </ThemeProvider>
  );
}
