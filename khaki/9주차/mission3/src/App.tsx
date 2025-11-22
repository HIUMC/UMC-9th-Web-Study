import "./App.css";
import { CartList } from "./components/CartList";
import { Navbar } from "./components/Navbar";
import { PriceBox } from "./components/PriceBox";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />

      <Modal />
    </>
  );
}

export default App;
