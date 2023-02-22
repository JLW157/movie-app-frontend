const DisplayErrors = (props: displayErrorsProps) => {
    return <>
        {props.errors ? <ul style={{ color: "red" }}>
            {props.errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul> : null}
    </>
};

export default DisplayErrors;

interface displayErrorsProps {
    errors?: string[];
}