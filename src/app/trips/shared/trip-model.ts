import { LocationModel } from 'src/app/locations/shared/location-model';
import { UserModel } from 'src/app/users/shared/user-model';
import { Time } from '@angular/common';

export interface TripModel {
    hunter: UserModel;
    location: LocationModel;
    date: Date;
    timeFrom: Time;
    timeTo: Time;
    guest?: string;
    huntingType?: HuntingType;
    animalGender?: AnimalGender;
    reasonOfDeath?: ReasonOfDeath;
    animalCount?: number;
    markNumber?: number;
    note?: string;
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