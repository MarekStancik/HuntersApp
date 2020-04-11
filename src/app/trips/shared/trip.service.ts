import { Injectable } from '@angular/core';
import { TripModel } from './trip-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  deleteTrip(row: TripModel) {
    const index = this.collection.indexOf(row);
    if(index > -1)
      this.collection.splice(index,1);      
  }

  private _dateFilter: Date = new Date();

  get dateFilter(){
    return this._dateFilter;
  }

  set dateFilter(date: Date){
    this._dateFilter = date;
  }

  readTrips(date: Date, filter: string, sortDirection: string, pageIndex: number, pageSize: number) :  Observable<TripModel[]> {
    this._dateFilter = date;
    return of(this.collection);
  }

  collection: TripModel[] = [];

  constructor() { }

  add(trip: TripModel): Observable<TripModel>{
    this.collection.push(trip);
    return of(trip);
  }
}
