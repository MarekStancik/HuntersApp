import { LocationModel } from 'src/app/locations/shared/location-model';

export interface HuntingCatch{
  animal: string;
  gender: AnimalGender;
  reasonOfDeath: ReasonOfDeath;
  markNumber: number;
}

export interface TripModel {
    id?: string; 
    hunter: {
      id: string;
      name: string;
    };
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