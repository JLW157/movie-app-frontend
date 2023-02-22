import { actorCreationDTO } from "../actors/actors.models";
import { movieCreationDTO } from "../movies/movies.models";

export function convertActorToFormData(actor: actorCreationDTO): FormData {
    const formData = new FormData();

    formData.append("name", actor.name);
    if (actor.biography) {
        formData.append("biography", actor.biography);
    }

    if (actor.dateOfBirth) {
        formData.append("dateOfBirth", formatDate(actor.dateOfBirth))
    }

    if (actor.picture) {
        formData.append("picture", actor.picture);
    }

    return formData;
};

export function convertMovieToFormData(movie: movieCreationDTO) {
    const formData = new FormData();

    console.log("Date: ", movie.releaseDate);
    formData.append("title", movie.title);

    if (movie.summary) {
        formData.append("summary", movie.summary);
    }

    formData.append("trailer", movie.trailer);
    formData.append("inTheaters", String(movie.inTheaters));

    if (movie.releaseDate) {
        formData.append("releaseDate", movie.releaseDate.toISOString());
    }

    if (movie.poster) {
        formData.append("poster", movie.poster);
    }

    formData.append("genresIds", JSON.stringify(movie.genresIds));
    formData.append("movieTheatersIds", JSON.stringify(movie.movieTheatersIds));
    formData.append("actors", JSON.stringify(movie.actors));

    return formData;
};

function formatDate(date: Date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};