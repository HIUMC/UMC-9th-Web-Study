import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="mb-6 px-3 py-1 rounded-md text-sm font-semibold transition-colors duration-300 ease-in-out
        bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    >
      {darkMode ? "🌙 다크모드" : "☀️ 라이트모드"}
    </button>
  );
}
