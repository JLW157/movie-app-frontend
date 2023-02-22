import { useRouteError } from "react-router-dom";
import PageContent from "./PageContent";

const ErrorPage = () => {
    const error:any = useRouteError();

    let title = "Error!";
    let message = "Something went wrong";
    const status = error.status;

    console.log(status);
    console.log(error);
    switch (status) {
        case 404:
            title = "Not found"
            message = "You entered invalid URL or something went wrong!";

            console.log("ehe")
            break;
        case 500:
            console.log(error.data.message);
            message = error.data.message;
            break;
        default:
            break;
    }

    return <PageContent title="An error occurred!">
        <h1>Title: {title}</h1>
        <h2>Status: {status}</h2>
        <h3>Message: {message}</h3>
    </PageContent>
};

export default ErrorPage;