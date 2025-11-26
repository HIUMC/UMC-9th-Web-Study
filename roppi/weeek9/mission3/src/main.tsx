import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*React Redux는 내부적으로 Context API로 store를 전달함.
    그래서 Provider 없이 hook을 호출하면 store를 찾을 수 없음.*/}
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
