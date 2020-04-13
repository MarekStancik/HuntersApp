import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readAll() : Observable<UserModel[]> {
    return of(this.collection);
  }

  collection: UserModel[] = [];

  constructor() { 
  }
}
