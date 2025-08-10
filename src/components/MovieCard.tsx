import '../css/MovieCard.css';
import type {Movie} from "../Types/Movie.ts";
import {useMovieContext} from "../contexts/UseMovieContext.tsx";
import * as React from "react";

function MovieCard({movie}: { movie: Movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
    const favorite = isFavorite(movie.id);


    function onFavoriteClick(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}
                            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
                        ❤
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    );
}

export default MovieCard;
