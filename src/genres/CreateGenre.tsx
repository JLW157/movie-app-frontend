import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genres.model";
import axios, { AxiosError } from "axios";
import { urlGenres } from "../endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayErrors";

const CreateGenre = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    const createGenre = async (genre: genreCreationDTO) => {
        try {
            await axios.post(urlGenres, genre);
            navigate("/genres");
        } catch (error) {
            const err = error as AxiosError<string[]>;
            console.log("IN ERROR CATCH");
            console.log(err);
            if (err && err.response) {
                setErrors(err.response?.data);
            }
        }
    };


    return <>
        <h3>Create genre</h3>
        <DisplayErrors errors={errors} />
        <GenreForm model={{ name: '' }} onSubmit={async (value) => {
            await createGenre(value);
        }} />
    </>
};

export default CreateGenre;