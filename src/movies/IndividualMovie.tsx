import { movieDTO } from "./movies.models";
import classes from "./IndividualMovie.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext } from "react";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";

export function IndividualMovie(props: movieDTO) {
    const buildLink = () => `/movies/${props.id}`;

    const customAlert = useContext(AlertContext);

    const deleteMovie = () => {
        try {
            axios.delete(`${urlMovies}/${props.id}`).then(() => {
                customAlert();
            });
        } catch (error) {

        }
    }

    return <>
        <div className={classes.div}>
            <Link to={buildLink()}>
                <img alt="Poster" src={props.poster} />
            </Link>
            <p>
                <Link to={buildLink()}>
                    {props.title}
                </Link>
            </p>
            <Authorized role="admin" authorized={<div>
                <Link style={{ marginRight: "1rem" }} className="btn btn-info"
                    to={`/movies/edit/${props.id}`}>Edit</Link>
                <Button className="btn btn-danger" onClick={() => customConfirm(() => deleteMovie())}>Delete</Button>
            </div>} />
        </div>
    </>
}