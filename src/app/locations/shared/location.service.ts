import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationModel } from './location-model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  collection: LocationModel[] = [
    {
      id: '1',
      name: 'Jazero'
    },
    {
      id: '2',
      name: 'Kostolne'
    },
  ];

  constructor() { }

  readAll(): Observable<LocationModel[]>{
    return of(this.collection);
  }

  add(locName :string): Observable<LocationModel>{
    const loc: LocationModel = {
      id: '2',
      name: locName
    }
    this.collection.push(loc);
    return of(loc);
  }
}
