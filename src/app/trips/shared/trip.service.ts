import { Injectable } from '@angular/core';
import { TripModel } from './trip-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  readTrips(date: Date, filter: string, sortDirection: string, pageIndex: number, pageSize: number) :  Observable<TripModel[]> {
    return of(this.collection);
  }

  collection: TripModel[] = [];

  constructor() { }

  add(trip: TripModel): Observable<TripModel>{
    this.collection.push(trip);
    return of(trip);
  }
}
