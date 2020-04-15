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

  updateUser(user: UserModel):Promise<any>{
    if(user.id === this._auth.currentUser.id && this._auth.isAdmin(this._auth.currentUser) && !user.roles.admin)
      return Promise.reject({message: 'Nemôžte odstránit admin práva sám sebe'});
    return this.afs.collection('users').doc(user.id).set(user);
  }

  readAll() : Observable<UserModel[]> {
    return this.afs.collection<UserModel>('users').valueChanges();
  }
}
