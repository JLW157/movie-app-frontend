import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import Button from "../UI/Button";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import * as Yup from "yup";
import MapField from "../forms/MapField";
import { coordinateDTO } from "../utils/coordinates.model";
const MovieTheatherForm = (props: movieTheaterForm) => {

    const transformCoordinates = (): coordinateDTO[] | undefined => {
        if (props.model.latitude && props.model.longtiude) {
            const response: coordinateDTO = { lat: props.model.latitude, lng: props.model.longtiude };
            return [response];
        }

        return undefined;
    };

    return <>
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required").firstLetterUppercase(),
            })}>
            {(formikProps) => (
                <Form>
                    <TextField field={"name"} displayField={"Name"} />
                    <div style={{ marginBottom: "1rem" }}>
                        <MapField latField="latitude" lngField="longtiude"
                            coordinates={transformCoordinates()} />
                    </div>
                    <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                    <Link className="btn btn-secondary" to="/movie-theathers">Cancel</Link>
                </Form>
            )}
        </Formik>
    </>
};

interface movieTheaterForm {
    model: movieTheaterCreationDTO;
    onSubmit: (values: movieTheaterCreationDTO, action: FormikHelpers<movieTheaterCreationDTO>) => void;
};

export default MovieTheatherForm;