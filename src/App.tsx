
import './App.css';
import Movies from './components/Movies'
import { useSearch } from './hooks/useSearch';

function App() {
  const { query, error, handleChange, handleSubmit } = useSearch()

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
        <Movies />
      </main>
    </div>
  )
}

export default App
