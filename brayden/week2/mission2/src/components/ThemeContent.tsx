import { THEME, useTheme } from "./context/ThemeProvider";
import clsx from "clsx";
export default function ThemeContent() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx("p-4 h-dvh", isLightMode ? "bg-white" : "bg-gray-800")}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        Theme Content
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur at
        eveniet maxime itaque blanditiis labore doloremque officia praesentium
        veritatis reiciendis, dolores optio ipsa animi? Ad adipisci nisi neque
        ullam tempora.
      </p>
    </div>
  );
}
