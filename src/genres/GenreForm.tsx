import { Formik, FormikHelpers, Form} from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../UI/Button";
import * as Yup from "yup";
import { genreCreationDTO } from "./genres.model";

const GenreForm = (props: genreFormProps) => {
    return <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string().required("This is field is requiered").max(50, "Max name`s lenght is 50 characters.")
            .firstLetterUppercase(),
        })}>
        {(formikProps) => (
            <Form>
                <div className='form-group'>
                    <TextField displayField="Name" field="name" />
                </div>
                <div className="d-flex gap-2 mt-2">
                    <Button
                        disabled={formikProps.isSubmitting}
                        type='submit'>Save changes</Button>
                    <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                </div>
            </Form>
        )}
    </Formik>
};

export default GenreForm;

interface genreFormProps {
    model: genreCreationDTO,
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void
}