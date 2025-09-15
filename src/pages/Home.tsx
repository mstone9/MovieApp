import MovieCard from "../components/MovieCard.tsx";
import '../css/Home.css';
import {searchMovies,getPopularMovies} from "../services/api";
import {useState, useEffect, useCallback} from "react";
import type {Movie} from "../Types/Movie.ts";

function Home() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Debounced search function
    const debouncedSearch = useCallback(
        async (searchTerm: string) => {
            if (!searchTerm.trim()) {
                // If the search is empty, load popular movies
                try {
                    setLoading(true);
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                    setError(null);
                } catch (err) {
                    console.error("Failed to Load Movies:", err);
                    const errorMessage = err instanceof Error ? err.message : "Failed to Load Movies";
                    setError(errorMessage);
                } finally {
                    setLoading(false);
                }
                return;
            }

            try {
                setLoading(true);
                const searchResult = await searchMovies(searchTerm);
                setMovies(searchResult);
                setError(null);
            } catch (err) {
                console.error("Failed to Search Movies:", err);
                const errorMessage = err instanceof Error ? err.message : "Failed to Search Movies";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Debounce effect - run for both search and empty search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            debouncedSearch(search);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, debouncedSearch]);

    return (
        <div className="home">
            {error && <div className="error-message">{error}</div>}

            <div className="search-form">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;