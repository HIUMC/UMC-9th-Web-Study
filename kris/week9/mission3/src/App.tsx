import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";

function App() {
  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
    </>
  );
}

export default App;
