import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useEffect } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import DisplayErrors from "./DisplayErrors";
import Loading from "./Loading";

export default function EditEntity<TCreation, TRead>(props:
    editEntityProps<TCreation, TRead>) {

    const navigate = useNavigate();
    const { id }: any = useParams();
    const [entity, setGenre] = useState<TCreation>();
    const [errors, setErrors] = useState<string[]>();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
            .then((res: AxiosResponse<TRead>) => {
                setGenre(props.transform(res.data));
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const edit = async (entityToEdit: TCreation) => {
        try {
            if (props.transformFormData) {
                const formData = props.transformFormData(entityToEdit);
                await axios({
                    method: "PUT",
                    url: `${props.url}/${id}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }
            else {
                await axios.put(`${props.url}/${id}`, entityToEdit);
            }
            navigate(props.indexURL);
        } catch (error) {
            const err = error as AxiosError<string[]>;
            if (err && err.response) {
                setErrors(err.response.data);
            }
        }
    };

    return (
        <>
            <h3>Edit {props.name} for {id}</h3>
            <DisplayErrors errors={errors} />
            {entity ? props.children(entity, edit) : <Loading />}
        </>
    )
};

interface editEntityProps<TCreation, TRead> {
    url: string;
    indexURL: string;
    transform(entity: TRead): TCreation;
    transformFormData?(model: TCreation): FormData;
    name: string;
    children(entity: TCreation, edit: (entity: TCreation) => void): ReactElement;
}

EditEntity.defaultProps = {
    transform: (entity: any) => entity,
};