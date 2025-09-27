import MoviePage from "./pages/MoviePage"

const App = () => {
  console.log(import.meta.env.VITE_TMDB_KEY)
  return (
    <>
      <MoviePage/>
    </>
  )
}

export default App
