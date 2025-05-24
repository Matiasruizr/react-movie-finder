import { useState, useEffect } from 'react';

export function useMovies() {
    const apiKey = "4287ad07"
    const baseApi = `http://www.omdbapi.com/?apikey=${apiKey}&`

    const [movies, setMovies] = useState<any[]>([])
    
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`${baseApi}s=godfather`)
            const data = await response.json()
            setMovies(data.Search)
        }
        
        fetchMovies()
    }, [])
    
    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.type
    }))

    return { movies: mappedMovies }
}