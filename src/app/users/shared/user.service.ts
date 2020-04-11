import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collection: UserModel[] = [];

  passwords = new Map<string,string>();

  currentUser : UserModel;

  constructor() { 
    const admin = {id: '1',name: 'karol',roles: {admin: true}};
    this.collection.push(admin);
    this.passwords.set(admin.name,'Heslo123');
    this.currentUser = admin;
  }

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

  login(name: string, pass: string): Promise<Boolean>{
    if(this.passwords.get(name) === pass){
      for (const user of this.collection) {
        if(user.name === name){
          this.currentUser = user;
          return Promise.resolve(true);
        }
      }
    }
    return Promise.reject({message:'Incorrect email or password'});
  }

  signOut(){
    this.currentUser = null;
  }

  isAdmin(user: UserModel){
    const allowed = ['admin'];
    return this.checkAuthorization(user,allowed);
  }

  private checkAuthorization(user: UserModel,allowedRoles: string[]): boolean{
    if(!user) return false;

    for(const role of allowedRoles){
      if(user.roles[role]){
        return true;
      }
    }
    return false;
  }
}
