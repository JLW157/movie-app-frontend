import { networkInterfaces } from "os";

export interface movieTheaterCreationDTO{
    name: string;
    latitude?: number;
    longtiude?: number;
}

export interface movieTheaterDTO{
    id:number;
    name: string;
    latitude?: number;
    longtiude?: number;
}