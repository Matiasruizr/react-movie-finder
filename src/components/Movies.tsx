import { useState, useMemo } from 'react';
import { useMovies } from '../hooks/useMovies'

const Movies = () => {
    const { movies } = useMovies();
    const hasMovies = useMemo(() => movies?.length > 0, [movies])
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <section className="results">
          {hasMovies ? (
            movies.map((movie) => (
              <div className="result" key={movie.id}>
                <picture>
                  <img src={movie.poster} alt={movie.title} />
                </picture>
                <h4>{movie.title}</h4>
                <p>{movie.year} - {movie.type}</p>
              </div>
            ))
          ) : (
            <h3>There are no movies for this search</h3>
          )}
        </section>
    )
}

export default Movies;