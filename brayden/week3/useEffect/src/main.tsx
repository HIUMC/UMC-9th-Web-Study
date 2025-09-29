import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// strictmode에서는 useEffect가 2번 실행됨

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
