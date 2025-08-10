import * as React from 'react';
import {createContext, useEffect, useState} from 'react';
import type {Movie} from '../Types/Movie.ts';


interface MovieContextType {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieID: number) => void;
    isFavorite: (movieID: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);


export {MovieContext};
export type {MovieContextType};

export const MovieProvider = ({children}: { children: React.ReactNode }
) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");

        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie: Movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieID: number) => {
        setFavorites(prev => prev.filter(movie => movie["id"] !== movieID));
    }

    const isFavorite = (movieID: number) => {
        return favorites.some(movie => movie["id"] === movieID);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
}