import { PetsSize } from "../enums/pets-size.enum";
import { PetSpecies } from "../enums/pets-species.enum";


export interface LostPetsRadar {

    id: number;
    name: string;
    species: PetSpecies;
    breed: string;
    color: string;
    size: PetsSize;
    description: string;
    lat: number;
    lon: number;
    photo_url: string | null;
    address: string;
    lost_date: Date;

}