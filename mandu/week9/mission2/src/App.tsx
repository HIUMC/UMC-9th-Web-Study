import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";
import { useSelector } from "./hooks/useCustomRedux";
import Modal from "./components/Modal";

function App() {
  const { open } = useSelector((state) => state.modal);
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
