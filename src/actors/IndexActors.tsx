import { urlActors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { actorDTO } from "./actors.models";

const IndexActors = () => {
    return <>
        <IndexEntity<actorDTO>
            url={urlActors}
            title={"Actors"}
            name={"actor"}
        >
            {(actors, buttons) => (
                <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {actors.map(actor => <tr key={actor.id}>
                            <td>{buttons(`edit/${actor.id}`, actor.id)}</td>
                            <td>
                                {actor.name}
                            </td>
                        </tr>)}
                    </tbody>
                </>
            )}
        </IndexEntity>

    </>
};

export default IndexActors;