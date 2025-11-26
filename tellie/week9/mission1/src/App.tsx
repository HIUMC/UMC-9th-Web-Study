import './App.css'
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import { Provider } from 'react-redux';
import store from './store/store';
import PriceBox from './components/PriceBox';

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <div className='pt-15'>
        <CartList />
        <PriceBox />
      </div>
    </Provider>
  )
}

export default App;
