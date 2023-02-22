import axios, { AxiosResponse, AxiosError } from "axios";
import { useState, useCallback, useEffect, ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
    const [entities, setEntities] = useState<T[]>([]);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const loadData = useCallback(() => {
        axios.get(props.url, {
            params: { page, recordsPerPage }
        })
            .then((res: AxiosResponse<T[]>) => {
                const totalAmountOfRecords =
                    parseInt(res.headers["totalamountofrecords"], 10);

                let totalAmountOfPages = Math.ceil(totalAmountOfRecords / recordsPerPage);
                
                setTotalAmountOfPages(totalAmountOfPages);
                setEntities(res.data);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage]);

    useEffect(() => {
        loadData();

    }, [recordsPerPage, page, loadData]);

    const deleteEntity = async (id: number) => {
        try {
            const res = await axios.delete(`${props.url}/${id}`);
            console.log(res);
            loadData();
        } catch (error) {
            const err = error as AxiosError;
            if (err) {
                console.log(err);
            }
        }
    };

    const buttons = (editUrl: string, id: number) => <>
        <Link
            className="btn btn-success"
            to={`${editUrl}`}>Edit</Link>
        <Button
            onClick={() => customConfirm(() => deleteEntity(id))}
            className="btn btn-danger">Delete</Button>
    </>;

    return (
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to="create">Create {props.name}</Link>
            <RecordsPerPageSelect onChange={(amountOfRecords) => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }} />
            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages}
                onChange={(newPage) => setPage(newPage)} />
            <GenericList list={entities}>
                <table className="table table-striped">
                    {props.children(entities!, buttons)}
                </table>
            </GenericList>
        </>
    )
};

interface indexEntityProps<T> {
    url: string;
    title: string;
    name?: string;
    children: (entities: T[],
        buttons: (editUrl: string, id: number)
            => ReactElement) => ReactElement
}