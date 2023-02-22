import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../UI/Button";
import { actorCreationDTO } from "./actors.models";
import * as Yup from 'yup';
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkDownField from "../forms/MarkDownField";

const ActorForm = (props: actorFormProps) => {

    console.log("IN FORM model", props.model);
    return (
        <>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    name: Yup.string().required("This field is required").firstLetterUppercase(),
                    dateOfBirth: Yup.date().nullable().required("This field is required"),
                })}
            >
                {(formikProps) => (
                    <Form>
                        <TextField displayField="Name" field="name" />
                        <DateField displayName="Date of Birth" field="dateOfBirth" />
                        <ImageField displayName="Picture" field="picture"
                            imageURL={props.model.pictureURL} />
                        <MarkDownField displayName="Bigoraphy" field="biography" />
                        <Button disabled={formikProps.isSubmitting} type="submit">
                            Save changes
                        </Button>
                        <Link to='/actors' className="btn btn-secondary">Cancel</Link>
                    </Form>
                )}
            </Formik>
        </>
    )
};

export default ActorForm;

interface actorFormProps {
    model: actorCreationDTO;
    onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;
}