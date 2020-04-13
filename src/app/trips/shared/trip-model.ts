import { LocationModel } from 'src/app/locations/shared/location-model';
import { UserModel } from 'src/app/users/shared/user-model';

export interface HuntingCatch{
  animal: string;
  animalGender: AnimalGender;
  reasonOfDeath: ReasonOfDeath;
  markNumber: number;
}

export interface TripModel {
    hunter: UserModel;
    location: LocationModel;
    timeFrom: Date;
    timeTo: Date;
    guest?: string;
    huntingType?: HuntingType; 
    note?: string;
    catches?: HuntingCatch[]; 
}

export enum HuntingType{

}

export enum ReasonOfDeath{
  U,
  N
}

export enum AnimalGender{
  M,
  F
}