import { useContext } from "react";
import { TodoContext } from "./TodoContext";
import type { TodoContextType } from "../types";

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodoContext must be used within TodoProvider");
  return context;
};
