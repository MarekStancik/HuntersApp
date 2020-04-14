import { Injectable } from '@angular/core';
import { UserModel } from '../../users/shared/user-model';
import { Observable, of } from 'rxjs';
import {auth} from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;

  private _currentUser: UserModel = null;

  get currentUser(){
    return this._currentUser;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            return this.afs.collection<UserModel>('users').doc(user.uid).valueChanges();
          }else{
            return of(null);
          }
        })
      );
  
      this.user$.subscribe(data => this._currentUser = data);
  }

  private userNameToEmail(username: string) : string
  {
    return username.replace(/\s+/g,'.').normalize('NFD').replace(/[^a-zA-Z.]/g, '').toLowerCase() + '@mockemail.com';
  }

  signIn(username: string, password: string) : Promise<auth.UserCredential>{
    const emailMock = this.userNameToEmail(username);  
    return this.afAuth.signInWithEmailAndPassword(emailMock,password);
  }

  signOut():Promise<void>{
    return this.afAuth.signOut();
  }

  addUser(username: string,pass: string):Promise<auth.UserCredential>{
    const emailMock = this.userNameToEmail(username);
    return new Promise((resolve,reject) => {
      this.afAuth.createUserWithEmailAndPassword(emailMock,pass)
      .then(ref => { 
        const user: UserModel = {
          id: ref.user.uid,
          email: emailMock,
          name: username,
          roles: { hunter: true }
        };
        this.afs.doc(`users/${ref.user.uid}`).set(user)
        resolve(ref);
      })
      .catch(err => reject(err))
    });
  }

  //-----------------Authorization----------------//

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
