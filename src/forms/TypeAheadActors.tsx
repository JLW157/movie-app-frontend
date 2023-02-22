import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { actorMovieDTO } from "../actors/actors.models";
import { urlActors } from "../endpoints";

const TypeAheadActors = (props: typeAheadProps) => {
    const [actors, setActors] = useState<actorMovieDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const selected: actorMovieDTO[] = [];

    const [dragElement, setDragElement] = useState<actorMovieDTO | undefined>(undefined);

    const handleDragStart = (actor: actorMovieDTO) => {
        setDragElement(actor);
    };


    const handleDragOver = (actor: actorMovieDTO) => {
        if (!dragElement) {
            return;
        }

        if (actor.id !== dragElement.id) {
            const draggedElementIndex = props.actors.findIndex(x => x.id === dragElement.id);
            const actorIndex = props.actors.findIndex(x => x.id === actor.id);
         
            const actors = [...props.actors];
            actors[actorIndex] = dragElement;
            actors[draggedElementIndex] = actor;
            props.onAdd(actors);
        }
    };

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        axios.get(`${urlActors}/searchByName/${query}`)
        .then((response: AxiosResponse<actorMovieDTO[]>) => {
            setActors(response.data);
            setIsLoading(false);
        });
    };

    return <>
        <label>{props.displayName}</label>
        <AsyncTypeahead
            id="typeahead"
            options={actors}
            onChange={actors => {
                if (props?.actors?.findIndex(x => x.id === actors[0].id) === -1) {
                    actors[0].character = '';
                    props.onAdd([...props.actors, actors[0]]);
                }
                console.log(actors);
            }}
            filterBy={() => true}
            isLoading={isLoading}
            onSearch={handleSearch}
            labelKey={(actor) => actor.name}
            placeholder="Write the name of the actor"
            flip={true}
            selected={selected}
            minLength={1}
            renderMenuItemChildren={actor => (
                <>
                    <img alt="actor" src={actor.picture}
                        style={{ objectFit: "contain", height: "64px", marginRight: "10px", width: "64px" }} />
                    <span>{actor.name}</span>
                </>
            )} />
        <ul className="list-group">
            {props.actors.map(actor => <li 
            key={actor.id} 
            draggable={true}
            onDragStart={() => handleDragStart(actor)}
            onDragOver={() => handleDragOver(actor)}
            className="list-group-item list-group-action"
            >{props.listUI(actor)}
            <span className="badge badge-primary badge-pill pointer text-dark"
            style={{marginLeft: "0.5rem"}}
            onClick={() => props.onRemove(actor)}>X</span>
            </li>)}
        </ul>
    </>
};

interface typeAheadProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actor: actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement
}

export default TypeAheadActors;