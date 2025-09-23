import { TodoProvider } from "./context/TodoContext";
import AppContent from "./components/AppContent";

export default function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}
