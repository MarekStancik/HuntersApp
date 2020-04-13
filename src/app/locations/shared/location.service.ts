import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationModel } from './location-model';
import { AngularFirestore} from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

const collectionName = 'locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  update(loc: LocationModel, newName: string): Promise<any> {
    return this.afs.collection<LocationModel>(collectionName)
        .doc(loc.name)
        .delete()
        .then(() => this.add(newName));
  }

  

  constructor(private afs: AngularFirestore) { }

  readAll(): Observable<LocationModel[]>{
    return this.afs.collection<LocationModel>(collectionName)
      .snapshotChanges()
      .pipe(
        map(val => {
          return val.map(a =>  a.payload.doc.data())
        })
      );
  }

  add(locName :string): Promise<LocationModel>{
    let rval: LocationModel = {name: locName}
    return new Promise((resolve,reject) => {
      this.afs.collection<LocationModel>(collectionName)
        .doc(locName)
        .set(rval)
        .then(ref => resolve(rval))
        .catch(err => reject(err));
    });
  }
}
