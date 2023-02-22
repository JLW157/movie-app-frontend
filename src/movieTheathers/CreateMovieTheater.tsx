import axios from "axios";
import { urlMovieTheaters } from "../endpoints";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import MovieTheatherForm from "./MovieTheaterForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

const CreateMovieTheather = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create( movieTheater: movieTheaterCreationDTO) {
        try {
            await axios.post(urlMovieTheaters, movieTheater);
            navigate("/movie-theathers");        
        } catch (error : any) {
            if (error && error.respose) {
                setErrors(error.response.data);
            }
        }
    }
    return <>
        <h3>Create movie theather</h3>
        <DisplayErrors errors={errors}></DisplayErrors>
        <MovieTheatherForm model={{ name: "" }}
            onSubmit={(async values => await create(values))} />
    </>
};

export default CreateMovieTheather;