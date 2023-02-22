import { urlGenres } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model";

const EditGenre = () => {
    return <>
        <EditEntity<genreCreationDTO, genreDTO> name={"Genre"} url={urlGenres} indexURL="/genres">{(entity, edit) => (
            <GenreForm model={entity} onSubmit={async value => {
                await edit(value);
            }}></GenreForm>
        )}</EditEntity>
    </>
};

export default EditGenre;