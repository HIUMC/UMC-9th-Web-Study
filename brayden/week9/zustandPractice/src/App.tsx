import "./App.css";
import Counter from "./components/Counter";
import RandomNumberGenerator from "./components/RandomNumberGenerator";
import { useCounterStore } from "./stores/counterStore";

function App() {
  const state = useCounterStore((state) => state);
  console.log(state);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
      <Counter />
      <RandomNumberGenerator />
    </div>
  );
}

export default App;
