import { Form, Formik, FormikHelpers } from "formik";
import { userCredentionals } from "./auth-models";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const AuthForm = (props: authFormProps) => {
    return <>
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={
                Yup.object({
                    email: Yup.string().required("This field is required")
                        .email("You have to insert valid email"),
                    password: Yup.string().required("This field is required")
                })
            }>
            {(formikPorps) => {
                return <>
                    <Form>
                        <TextField displayField="Email" field="email"/>
                        <TextField displayField="Password" field="password" type={"password"}></TextField>
                        
                        <Button disabled={formikPorps.isSubmitting} type="submit">Send</Button>
                        <Link className="btn btn-secondary" to={"/"}>Cancel</Link>
                    </Form>
                </>
            }}
        </Formik>
    </>
}

export default AuthForm;

interface authFormProps {
    model: userCredentionals;
    onSubmit(values: userCredentionals, actions: FormikHelpers<userCredentionals>): void;
}   