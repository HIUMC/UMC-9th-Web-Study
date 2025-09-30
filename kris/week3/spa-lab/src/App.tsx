import { useState } from 'react'
import './App.css'
import { Link } from './Link';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
  }

  window.onpopstate = () => {
    setPath(window.location.pathname);
  }

  const Header = () => {
    return (
      <>
        <nav className='flex gap-5'>
          <Link to="/kris" navigateTo={navigate}>Kris</Link>
          <Link to="/dorhy" navigateTo={navigate}>Dorhy</Link>
          <Link to="/not-found" navigateTo={navigate}>NotFound</Link>
        </nav>
      </>
    )
  }

  return (
    <>
      <Header />
      <div>
        {path === "/kris" && <h1>Kris Page</h1>}
        {path === "/dorhy" && <h1>Dorhy Page</h1>}
        {path === "/not-found" && <h1>404 Not Found</h1>}
      </div>
    </>
  )
}

export default App
