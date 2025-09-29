//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App'
//import UseEffectCounterPage from './useEffect/UseEffectCounterPage'
import UseEffectError from './useEffect/useEffectError'
//import MoviesPage from './pages/MoviePage.tsx'
//import SearchPage from './pages/SearchPages.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <UseEffectError />

  </>,
)
