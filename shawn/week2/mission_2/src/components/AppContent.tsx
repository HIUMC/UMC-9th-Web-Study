import TodoForm from "./TodoForm";
import TodoSection from "./TodoSection";
import DarkModeToggle from "./DarkModeToggle";

export default function AppContent() {
  return (
    <div className="h-screen flex justify-center items-start bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ease-in-out">
      <div
        className="font-sans p-8 rounded-xl shadow-md w-[500px] my-32 text-center
        bg-white dark:bg-gray-800 transition-colors duration-500 ease-in-out"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-500 ease-in-out">
          Shawn Todo
        </h1>

        <DarkModeToggle />

        <TodoForm />
        <div className="flex justify-between gap-4">
          <TodoSection title="할 일" isDone={false} />
          <TodoSection title="완료" isDone={true} />
        </div>
      </div>
    </div>
  );
}
