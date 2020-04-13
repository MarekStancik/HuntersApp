import { Injectable } from '@angular/core';
import { UserModel } from '../users/shared/user-model';
import { Observable } from 'rxjs';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  private _currentUser: UserModel = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

  }

  signIn(email: string, password: string) : Promise<auth.UserCredential>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  get currentUser(){
    return this._currentUser;
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
