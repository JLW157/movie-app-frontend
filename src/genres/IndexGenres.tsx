import { urlGenres } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { genreDTO } from "./genres.model";

const IndexGenres = () => {
    return (
        <>
            <IndexEntity<genreDTO> url={urlGenres}
                title="Genres"
                name="Genre">
                {(entities, buttons) => (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead><tbody>
                            {entities?.map(genre => {
                                return <tr key={genre.id}>
                                    <td>
                                        {buttons(`edit/${genre.id}`, genre.id)}
                                    </td>
                                    <td>{genre.name}</td>
                                </tr>;
                            })}
                        </tbody>
                    </>
                )}
            </IndexEntity>
        </>
    )
};

export default IndexGenres;