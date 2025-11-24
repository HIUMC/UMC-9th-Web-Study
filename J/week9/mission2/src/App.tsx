import { Provider } from 'react-redux'
import './App.css'
import { CartList } from './components/CartList'
import { Navbar } from './components/Navbar'
import { store } from './store/store'
import { PriceBox } from './components/PriceBox'
import { DeleteModal } from './components/DeleteModal'

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
      <CartList/>
      <PriceBox/>
      <DeleteModal/>
    </Provider>
  )
}

export default App
