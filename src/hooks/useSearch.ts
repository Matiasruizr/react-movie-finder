import { useEffect, useState, useRef } from 'react'
import { useMovies } from './useMovies'

export function useSearch() {
  const [query, setQuery] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const isFirstRender = useRef(true)
  const { getMovies } = useMovies()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setQuery(value)
  }
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = query === ''
      return
    }

    if (!query) {
      setError('Please enter a search term')
      return
    }
    if (query.length < 3) {
      setError('Search term must be at least 3 characters long')
      return
    }
    if (query.length > 20) {
      setError('Search term must be less than 20 characters long')
      return
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(query)) {
      setError('Search term must only contain letters, numbers, and spaces')
      return
    }
    setError(null)
  }, [query])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        getMovies(query)
    }

  return { query, error, handleChange, handleSubmit }
} 