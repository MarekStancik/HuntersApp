import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection: UserModel[] = [];

  passwords = new Map<string,string>();

  currentUser : UserModel = {id: '1',name: 'karol',roles: {hunter: true}};

  constructor() { }

  getCurrentUser(): UserModel{
    return this.currentUser;
  }

  create(name: string, pass: string): Observable<UserModel>{
    const user : UserModel = {
      id: '2',
      name: name,
      roles: {hunter: true}
    };
    this.collection.push(user);
    this.passwords.set(name,pass);
    return of(user);
  }

  login(name: string, pass: string){
    if(this.passwords.get(name) === pass){
      for (const user of this.collection) {
        if(user.name === name){
          this.currentUser = user;
          return true;
        }
      }
    }
    return false;
  }
}
