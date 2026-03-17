import { PetsSize } from "../enums/pets-size.enum";
import { PetSpecies } from "../enums/pets-species.enum";

export interface FoundPetsRadarCDto {
    species: PetSpecies;
    breed: string | null;
    color: string;
    size: PetsSize;
    description: string;
    photo_url: string | null;
    finder_name: string;
    finder_email: string;
    finder_phone: string;
    lat: number;
    lon: number;
    address: string;
    found_date: Date;
}