import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from './user-model';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _auth: AuthService,private afs: AngularFirestore) { 
  }

  createUser(user: UserModel,pass: string):Promise<UserModel>{
    return new Promise((resolve,reject) => {
      this._auth.addUser(user.email,pass)
      .then(data =>{
        user.id = data.user.uid;
        this.updateUser(user)
          .then(() => resolve(user))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  updateUser(user: UserModel):Promise<void>{
    return this.afs.collection('users').doc(user.id).set(user);
  }

  readAll() : Observable<UserModel[]> {
    return this.afs.collection<UserModel>('users').valueChanges();
  }
}
