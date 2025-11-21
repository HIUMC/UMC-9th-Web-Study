import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import Navnar from "./components/Navnar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";

function App() {
  return (
    <Provider store={store}>
      <Navnar />
      <CartList />
      <PriceBox />
    </Provider>
  );
}

export default App;
