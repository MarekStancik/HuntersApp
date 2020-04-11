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

  private equalOnlyDate(a: Date,b : Date): boolean{
    var d = new Date(a);
    var c = new Date(b);
    d.setHours(0,0,0,0);
    c.setHours(0,0,0,0);
    return c.valueOf() === d.valueOf();
  }

  readTrips(date: Date, 
    filter: string, 
    sortDirection: string, 
    pageIndex: number, 
    pageSize: number) 
  :  Observable<TripEnumerable> {
    const pageStart = pageIndex * pageSize;
    const filtered = this.collection
    .filter(trip =>{ 
      return (this.equalOnlyDate(trip.timeTo,date) || this.equalOnlyDate(trip.timeFrom,date))
      && trip.hunter.name.toLowerCase().includes(filter) //Filter by filter
    })
    .sort((a,b) =>{
      return a.hunter.name && b.hunter.name ? a.hunter.name.localeCompare(b.hunter.name) : 0;
    });

    const totalLength = filtered.length;
    const filteredAndSliced = filtered.slice(pageStart,pageStart + pageSize);

    this._dateFilter = date;
    return of({trips: filteredAndSliced, totalLength: totalLength});
  }

  collection: TripModel[] = [];

  constructor() { }

  add(trip: TripModel): Observable<TripModel>{
    this.collection.push(trip);
    return of(trip);
  }
}

export class TripEnumerable{
  trips: TripModel[];
  totalLength: number;
}