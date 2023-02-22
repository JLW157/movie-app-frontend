import { actorMovieDTO } from "../actors/actors.models";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheathers/movieTheater.model";

export interface movieDTO {
    id: number,
    title: string,
    poster: string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate: Date;
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[];
    actors?: actorMovieDTO[];
    userVote: number;
    avarageVote: number;
};

export interface landingPageDTO {
    inTheaters: movieDTO[],
    upcomingReleases: movieDTO[];
};

export interface movieCreationDTO {
    title: string;
    inTheaters: boolean;
    trailer: string;
    summary?: string;
    releaseDate?: Date;
    poster?: File;
    posterUrl?: string;
    genresIds?: number[];
    movieTheatersIds?: number[];
    actors?: actorMovieDTO[];
}

export interface moviesPostGetDTO{
    genres: genreDTO[];
    movieTheaters: movieTheaterDTO[]; 
}

export interface moviesPutGetDTO{
    movie: movieDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    actors: actorMovieDTO[];
}