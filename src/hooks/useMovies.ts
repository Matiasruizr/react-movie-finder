import { useState } from 'react';
import { searchMovies } from '../services/movies.ts';
import { useCallback } from 'react';

export function useMovies() {
    const [movies, setMovies] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const getMovies = useCallback(async (search: string) => {
        try {
            setLoading(true)
            const newMovies = await searchMovies(search)
            setMovies(newMovies)
            
        } catch (error) {
            setError('An error occurred while fetching the movies')
        } finally {
            setLoading(false)
        }
    }, []);

    return { movies, getMovies, error, loading  };
}