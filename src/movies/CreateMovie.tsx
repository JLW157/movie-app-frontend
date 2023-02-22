import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies } from "../endpoints";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheathers/movieTheater.model";
import { movieCreationDTO, moviesPostGetDTO } from "./movies.models";
import MovieForm from "./MovieForm";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/FormDataUtils";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../utils/DisplayErrors";

const CreateMovie = () => {
    const navigate = useNavigate();

    const [nonSelectedGenres, setNonSelectedGenres] =
        useState<genreDTO[]>([]);
    const [nonSelectedMovieTheaters, setNonSelectedMovietheaters] =
        useState<movieTheaterDTO[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlMovies}/postget`).then((res: AxiosResponse<moviesPostGetDTO>) => {
            setNonSelectedGenres(res.data.genres);
            setNonSelectedMovietheaters(res.data.movieTheaters);
            setLoading(false);
        })
            .catch(err => {
                setErrors(err.response.data);
                setLoading(false);
            });
    }, []);

    const create = async (movie: movieCreationDTO) => {
        try {
            const movieFormData = convertMovieToFormData(movie);
            const response = await axios({
                method: "post",
                url: urlMovies,
                data: movieFormData,
                headers: { "Content-Type": "multipart/form-data" }
            });

            navigate(`/movies/${response.data}`);
        } catch (error: any) {
            console.log("INMOVEIS ERRRORRS ", error);
            setErrors(error.response.data);
        }
    };

    return <>
        <h3>Create Movie</h3>
        <DisplayErrors errors={errors} />
        {loading ? <Loading /> :
            <MovieForm model={{ title: "", inTheaters: false, trailer: '' }}
            onSubmit={async (values) => await create(values)}
                // onSubmit ={(values) => {
                //     console.log("Submitting movie form!!");
                //     const movieFormData = convertMovieToFormData(values);
                //     console.log(movieFormData.get("releaseDate"));
                // }}    
                nonSelectedGenres={nonSelectedGenres}
                selectedGenres={[]}
                nonSelectedMovieTheaters={nonSelectedMovieTheaters}
                selectedMovieTheaters={[]}
                selectedActors={[]} />}
    </>
};

export default CreateMovie;