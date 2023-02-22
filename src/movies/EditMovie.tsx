import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertMovieToFormData } from "../utils/FormDataUtils";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviesPutGetDTO as moviePutGetDTO } from "./movies.models";

const EditMovie = () => {
    const navigate = useNavigate();

    const { id }: any = useParams();
    const [movie, setMovie] = useState<movieCreationDTO>();
    const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlMovies}/putget/${id}`)
            .then((response: AxiosResponse<moviePutGetDTO>) => {
                console.log("RESPONSE IN EDIT MOVIE", response.data);
                const model: movieCreationDTO = {
                    title: response.data.movie.title,
                    inTheaters: response.data.movie.inTheaters,
                    trailer: response.data.movie.trailer,
                    posterUrl: response.data.movie.poster,
                    summary: response.data.movie.summary,
                    releaseDate: new Date(response.data.movie.releaseDate),
                };

                setMovie(model);
                setMoviePutGet(response.data);
            });
    }, [id]);

    const edit = async (movie: movieCreationDTO) => {
        try {
            const formData = convertMovieToFormData(movie);
            await axios({
                method: "put",
                url: `${urlMovies}/putget/${id}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });
            navigate(`/movies/${id}`);
        } catch (error: any) {
            setErrors(error.response.daa)
        }
    };

    return <>
        <h3>Edit movie</h3>
        <DisplayErrors errors={errors} />
        {movie && moviePutGet ? 
        <MovieForm model={movie}
            onSubmit={async (values) => await edit(values)}
            nonSelectedGenres={moviePutGet.nonSelectedGenres}
            selectedGenres={moviePutGet.selectedGenres}
            nonSelectedMovieTheaters={moviePutGet.nonSelectedMovieTheaters}
            selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
            selectedActors={moviePutGet.actors} />
        : null}
    </>
};

export default EditMovie;