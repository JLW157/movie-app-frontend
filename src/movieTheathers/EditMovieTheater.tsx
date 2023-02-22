import { urlMovieTheaters } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movieTheater.model";
import MovieTheatherForm from "./MovieTheaterForm";

const EditMovieTheather = () => {
    return <>
        <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
            url={urlMovieTheaters}
            indexURL="/movie-theathers"
            name="Movie Theater">
            {(entity, edit) => (
                <MovieTheatherForm model={entity}
                    onSubmit={async values => await edit(values)} />
            )}
        </EditEntity>
    </>
};

export default EditMovieTheather;