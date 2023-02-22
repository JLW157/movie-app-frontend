import { urlMovieTheaters } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { movieTheaterDTO } from "./movieTheater.model";

const IndexMovieTheaters = () => {
    return <>
        <IndexEntity<movieTheaterDTO>
            url={urlMovieTheaters}
            title={"Movie Theaters"}
            name="movietheater">
            {(movieTheaters, buttons) => {
                return (
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieTheaters.map(movieTheater => <tr key={movieTheater.id}>
                                <td>{buttons(`edit/${movieTheater.id}`, movieTheater.id)}</td>
                                <td>
                                    {movieTheater.name}
                                </td>
                            </tr>)}
                        </tbody>
                    </>
                )
            }}
        </IndexEntity>
    </>
};

export default IndexMovieTheaters;