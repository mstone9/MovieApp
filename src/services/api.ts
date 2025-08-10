const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
const BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL

export const getPopularMovies = async() => {
    if (!API_KEY) {
        throw new Error('Movie API key is not configured');
    }

    const response = await fetch(`${BASE_URL}movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}


export const searchMovies = async(query: string) => {
    if (!API_KEY) {
        throw new Error('Movie API key is not configured');
    }

    const response = await fetch(
        `${BASE_URL}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json();
    return data.results;
}
