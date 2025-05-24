const apiKey = "4287ad07"
const baseApi = `http://www.omdbapi.com/?apikey=${apiKey}&`

export const searchMovies = async (search: string) => {
    if (search) {
        return fetch(`${baseApi}s=${search}`)
            .then((response) => response.json())
            .then((data) => {
                return data.Search.map((movie: any) => ({
                    id: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster,
                    type: movie.type
                }))
            }
        )
    } else {
        return []
    }
}