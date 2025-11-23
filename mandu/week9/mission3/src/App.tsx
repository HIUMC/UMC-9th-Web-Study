import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";
import { useModalInfo } from "./hooks/useModalStore";

function App() {
  const { open } = useModalInfo();
  return (
    <>
      <Navbar />
      {open && <Modal />}
      <CartList />
      <PriceBox />
    </>
  );
}

export default App;
