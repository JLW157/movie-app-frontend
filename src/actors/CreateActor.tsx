import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlActors } from "../endpoints";
import { convertActorToFormData } from "../utils/FormDataUtils";
import ActorForm from "./ActorForm";
import { actorCreationDTO } from "./actors.models";

const CreateActor = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    async function create(actor: actorCreationDTO) {
        try {
            const formData = convertActorToFormData(actor);
            await axios({
                method: "post",
                url: urlActors,
                data: formData,
                headers: {"Content-Type" : "multipart/form-data"},
            });
            navigate("/actors");
        } catch (error: any) {
            if (error && error.response) {
                setErrors(error.response.data);
            }
        }
    };

    return <>
        <h3>Create actor</h3>
        <ActorForm model={{
            name: '', dateOfBirth: undefined,
            pictureURL: "",
        }}
            onSubmit={async (values) => await create(values)}></ActorForm>
    </>
};

export default CreateActor;