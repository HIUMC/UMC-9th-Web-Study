import { Provider } from "react-redux"
import CartList from "./components/CartList"
import Navbar from "./components/Navbar"
import store from "./store/store"
import Footer from "./components/Footer"
import Modal from "./components/Modal"

function App() {


  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <Footer />
      <Modal />

      
    </Provider>
  )
}

export default App
