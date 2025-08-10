import {useContext} from "react";
import {MovieContext, type MovieContextType} from "./MovieContext.tsx";

export const useMovieContext = (): MovieContextType => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
};