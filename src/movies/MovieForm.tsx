import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.models";
import * as yup from "yup";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelctorModel } from "../forms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movieTheathers/movieTheater.model";
import TypeAheadActors from "../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.models";
import MarkDownField from "../forms/MarkDownField";

const MovieForm = (props: movieFormProps) => {
    const mapToModel = (items: genreDTO[]): multipleSelctorModel[] => {
        return items.map(item => {
            return { key: item.id, value: item.name };
        });
    }

    const [selectedActors, setSelectedActors] = useState<actorMovieDTO[]>(props.selectedActors);

    const [selectedGenres, setSelectedGenres] = useState<multipleSelctorModel[]>(mapToModel(props.selectedGenres));
    const [nonselectedGenres, setNonSelectedGenres] = useState<multipleSelctorModel[]>(mapToModel(props.nonSelectedGenres));

    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState<multipleSelctorModel[]>(mapToModel(props.selectedMovieTheaters));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<multipleSelctorModel[]>(mapToModel(props.nonSelectedMovieTheaters));

    return <>
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                values.genresIds = selectedGenres.map(item => item.key);
                values.movieTheatersIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;
                console.log("Sumbitting movie", values.releaseDate);
                props.onSubmit(values, actions)
                actions.setSubmitting(false);
            }}
            validationSchema={yup.object({
                title: yup.string().required("This field is required").firstLetterUppercase(),
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayField="Title" field="title" />
                    <CheckboxField displayName="In Theaters" field="inTheaters" />
                    <TextField displayField="Trailer" field="trailer" />
                    <DateField displayName="Release Date" field="releaseDate" />
                    <ImageField displayName="Poster" field="poster"
                        imageURL={props.model.posterUrl} />

                    <MarkDownField displayName="Summary" field="summary" />

                    <MultipleSelector
                        displayName="Genres"
                        nonSelected={nonselectedGenres}
                        selected={selectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }}></MultipleSelector>
                    <MultipleSelector
                        displayName="MovieTheaters"
                        nonSelected={nonSelectedMovieTheaters}
                        selected={selectedMovieTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelectedMovieTheaters(selected);
                            setNonSelectedMovieTheaters(nonSelected);
                        }}></MultipleSelector>

                    <TypeAheadActors displayName="Actors" actors={selectedActors}
                        onAdd={(actors) => {
                            setSelectedActors(actors);
                        }}
                        onRemove={(actor) => {
                            const actors = selectedActors.filter(x => x !== actor);

                            setSelectedActors(actors);
                        }}
                        listUI={(actor: actorMovieDTO) => {
                            return <>
                                {actor.name} / <input placeholder="Character" type="text"
                                    value={actor.character} onChange={e => {
                                        const index = selectedActors.findIndex(x => x.id === actor.id);

                                        const actors = [...selectedActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }} />
                            </>
                        }} />
                    <Button disabled={formikProps.isSubmitting}
                        type='submit'>Save changes</Button>
                    <Link className="btn btn-secondary" to={"/movies"}>Cancel</Link>
                </Form>
            )}
        </Formik>
    </>
};

export default MovieForm;

interface movieFormProps {
    model: movieCreationDTO;
    onSubmit: (values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>) => void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
    selectedActors: actorMovieDTO[];
}