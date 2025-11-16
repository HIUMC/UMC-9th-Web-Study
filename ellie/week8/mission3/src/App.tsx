import "./App.css";
import { HamburgerButton } from "./components/HamburgerButton";
import { Sidebar } from "./components/Sidebar";
import { useSidebar } from "./hooks/useSidebar";

function App() {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <header className="fixed top-0 left-0 bg-white shadow-sm z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-0 ml-0">
          <div className="flex items-center h-16 space-x-2">
            <HamburgerButton isOpen={isOpen} onClick={toggle} />
            <h1 className="text-xl font-bold text-gray-900"> 돌려돌려 LP판</h1>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOpen} onClose={close} />
      <h1 className="mt-20 text-3xl">
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
        texttexttexttext texttexttexttext texttexttexttext texttexttexttext
      </h1>
    </div>
  );
}

export default App;
