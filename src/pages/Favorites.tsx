import '../css/Favorites.css';
import {useMovieContext} from "../contexts/UseMovieContext.tsx";
import MovieCard from "../components/MovieCard.tsx";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return(
            <div className="favorites">
                <div className={`movies-grid ${favorites.length < 4 ? 'center-few-items' : ''}`}>
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies Yet</h2>
            <p> Start adding movies to your favorites and they will appear here</p>
        </div>
    )
}

export default Favorites