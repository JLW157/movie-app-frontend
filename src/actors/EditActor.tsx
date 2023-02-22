import { urlActors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertActorToFormData } from "../utils/FormDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO, actorDTO } from "./actors.models";

const EditActor = () => {
    const transform = (actor: actorDTO) : actorCreationDTO => {
        return {
            name: actor.name,
            pictureURL: actor.picture,
            biography: actor.biography,
            dateOfBirth: new Date(actor.dateOfBirth),
        }
    };
    
    return <>
        <EditEntity<actorCreationDTO, actorDTO>
            url={urlActors}
            indexURL="/actors"
            name="Actor"
            transformFormData={convertActorToFormData}
            transform={transform}
        >
            {(entity, edit) => (
                <>
                    <ActorForm model={entity}
                    onSubmit={async values => await edit(values)}/>
                    
                </>
            )}
        </EditEntity>
    </>
};

export default EditActor;