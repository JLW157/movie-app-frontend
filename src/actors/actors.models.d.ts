export interface actorCreationDTO {
    name: string;
    dateOfBirth?: Date;
    picture?: File;
    pictureURL?: string;
    biography?: string
};

export interface actorMovieDTO{
    id: number;
    name: string;
    character: string;
    picture: string;
}

export interface actorDTO{
    id: number;
    biography: string;
    name: string;
    dateOfBirth: Date;
    picture: string;
}