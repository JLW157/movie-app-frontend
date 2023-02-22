import GenericList from "../utils/GenericList";
import { IndividualMovie } from "./IndividualMovie";
import { movieDTO } from "./movies.models";
import styles from './MoviesList.module.css';

const MoviesList = (props: moviesListProps) => {
    console.log("In movies list!! ", props.movies);
    return (
        <GenericList 
        loadingUI={<p>Loading...</p>}
        list={props.movies}>
            <div className={styles.div}>
                {props.movies && props.movies.map(movie =>
                    <IndividualMovie key={movie.id} {...movie} />)}
            </div>
        </GenericList>
    )
};

export default MoviesList;

interface moviesListProps {
    movies: movieDTO[]
};