
import './App.css';
import Movies from './components/Movies'
import { useSearch } from './hooks/useSearch';
import { useMovies } from './hooks/useMovies';

function App() {
  const { query, error, handleChange } = useSearch()
  const { movies, getMovies, loading } = useMovies()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies(query)
  }

  return (
    <div>
      <header>
        <h1>Movie finder</h1>
        <form className="searchForm" onSubmit={handleSubmit}>
          <label>Search your movie</label>
          <section>
            <input type="text" name='query' placeholder='The godfather, Matrix, Goodfellas...' value={query} onChange={handleChange} />
            <input type="submit" value="Search" />
          </section>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

      <main>
        <h2>Results</h2>
        {loading && <p className='loading'>Loading...</p>}
        {!loading && movies.length === 0 && <p className='no-results'>No results found</p>}
        {!loading && movies.length > 0 && <p className='results-count'>{movies.length} results found</p>}
        {!loading && movies.length > 0 && (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  )
}

export default App
