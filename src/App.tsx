
import './App.css';
import Movies from './components/Movies'
import { useSearch } from './hooks/useSearch';
import { useMovies } from './hooks/useMovies';
import debounce from "just-debounce-it";
import React, { useCallback } from 'react';

function App() {
  const { query, error, setQuery } = useSearch()
  const { movies, getMovies, loading } = useMovies()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMovies(query)
  }

  const debouncedGetMovies = useCallback(
    debounce((search: string) => {
      if (search) {
        getMovies(search);
      }
    }, 500), [getMovies]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
    debouncedGetMovies(value);
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
