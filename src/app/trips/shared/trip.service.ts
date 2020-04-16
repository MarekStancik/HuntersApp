import { Injectable } from '@angular/core';
import { TripModel } from './trip-model';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

const collectionName = 'trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  deleteTrip(row: TripModel) {
   
  }

  private _dateFilter: Date = new Date();

  get dateFilter(){
    return this._dateFilter;
  }

  set dateFilter(date: Date){
    this._dateFilter = date;
  }

  constructor(private _afs: AngularFirestore) { }

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
    return this._afs.collection<TripModel>(collectionName).valueChanges()
      .pipe(
        map(data => {
          data.forEach(d => {
            const fromUnknown = d.timeFrom as unknown;
            const fromStamp = fromUnknown as firestore.Timestamp;
            d.timeFrom = fromStamp.toDate();
            
            const toUnknown = d.timeTo as unknown;
            const toStamp = toUnknown as firestore.Timestamp;
            d.timeTo = toStamp.toDate();
          })
          var enumerable : TripEnumerable = {trips: data,totalLength: data.length};
          return enumerable;
        })
      );
  
   /* const pageStart = pageIndex * pageSize;
    const filtered = this.collection
    .filter(trip =>{
      console.log(trip);
       
      return (this.equalOnlyDate(trip.timeTo,date) || this.equalOnlyDate(trip.timeFrom,date))
      && trip.hunter.name.toLowerCase().includes(filter) //Filter by filter
    })
    .sort((a,b) =>{
      return a.hunter.name && b.hunter.name ? a.hunter.name.localeCompare(b.hunter.name) : 0;
    });

    const totalLength = filtered.length;
    const filteredAndSliced = filtered.slice(pageStart,pageStart + pageSize);

    this._dateFilter = date;
    return of({trips: filteredAndSliced, totalLength: totalLength});*/
  }

  async add(trip: TripModel): Promise<any>{
    return this._afs.collection<TripModel>(collectionName).add(trip);
  }
}

export class TripEnumerable{
  trips: TripModel[];
  totalLength: number;
}