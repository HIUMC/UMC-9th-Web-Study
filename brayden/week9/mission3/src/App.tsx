import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";

function App() {
  // depth가 깊어질수록 props로 전달하기 어렵다
  // 그래서 redux 툴킷의 store를 사용한다.
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
