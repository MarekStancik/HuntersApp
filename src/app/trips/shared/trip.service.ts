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

  private _dateFilter: Date = new Date();

  editedRecord: TripModel = null;

  get dateFilter(){
    return this._dateFilter;
  }

  set dateFilter(date: Date){
    this._dateFilter = date;
  }

  constructor(private _afs: AngularFirestore) { 
    this._dateFilter.setHours(0,0,0,0);
  }

  private equalOnlyDate(a: Date,b : Date): boolean{
    var d = new Date(a);
    var c = new Date(b);
    d.setHours(0,0,0,0);
    c.setHours(0,0,0,0);
    return c.valueOf() === d.valueOf();
  }

  readTrips(
    date: Date, 
    filter: string,
    pageIndex: number, 
    pageSize: number) 
  :  Observable<TripEnumerable> {
    let endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    
    return this._afs.collection<TripModel>(collectionName,query => 
      query.where('timeFrom','>=',date).where('timeFrom','<',endDate).orderBy('timeFrom')
    ).snapshotChanges()
      .pipe(
        map(val => {
          return val.map(a => {
            var trip: TripModel;
            trip = a.payload.doc.data();
            trip.id = a.payload.doc.id;
            const fromUnknown = trip.timeFrom as unknown;
            const fromStamp = fromUnknown as firestore.Timestamp;
            trip.timeFrom = fromStamp.toDate();
            
            const toUnknown = trip.timeTo as unknown;
            const toStamp = toUnknown as firestore.Timestamp;
            trip.timeTo = toStamp.toDate();
            return trip;
          })
        }),
        map(data => {
          const pageStart = pageIndex * pageSize;
          const filtered = data
          .filter(d =>{
            return this.equalOnlyDate(d.timeFrom,date) && 
                (d.hunter.name.toLowerCase().includes(filter) || d.location.name.toLowerCase().includes(filter))
          })

          const totalLength = filtered.length;
          const filteredAndSliced = filtered.slice(pageStart,pageStart + pageSize);
            var enumerable : TripEnumerable = {trips: filteredAndSliced,totalLength: totalLength};
            return enumerable;
        })
      );
  }

  add(trip: TripModel): Promise<any>{
    return this._afs.collection<TripModel>(collectionName).add(trip);
  }

  deleteTrip(trip: TripModel) : Promise<void>{
    return this._afs.collection(collectionName).doc(trip.id).delete();
  }
}

export class TripEnumerable{
  trips: TripModel[];
  totalLength: number;
}