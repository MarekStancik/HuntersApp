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

  deleteUser(userId: string):Promise<any>{
    if(this._auth.isAdmin(this._auth.currentUser))
      return this.afs.collection('users').doc(userId).delete();
  
    return Promise.reject({message: 'you are not authorized to do this action'});
  }

  updateUser(user: UserModel):Promise<any>{
    if(!this.isValidUser(user) || !user.id){
      return Promise.reject({message: 'Užívateľ nemá priradené povinné atribúty'});
    }

    if(user.id === this._auth.currentUser.id && this._auth.isAdmin(this._auth.currentUser) && !user.roles.admin){
      return Promise.reject({message: 'Nemôžte odstránit admin práva sám sebe'});
    }

    return this.afs.collection('users').doc(user.id).set(user);
  }

  readAll() : Observable<UserModel[]> {
    return this.afs.collection<UserModel>('users').valueChanges();
  }

  isValidUser(user: UserModel): boolean{
    return user && user.name && user.name.length >= 4 && (user.roles.hunter || user.roles.admin);
  }

  isValidPass(pass: string):boolean{
    return pass && pass.length >= 8;
  }

  createUser(newUser: UserModel,pass: string): Promise<any>{
    if(!this.isValidUser(newUser)){
      return Promise.reject({message: 'Užívateľ nemá priradené povinné atribúty'});
    }

    if(!this.isValidPass(pass)){
      return Promise.reject({message: 'Heslo užívateľa nespĺňa požiadavky'});
    }
    
    if(!this._auth.currentUser || !this._auth.isAdmin(this._auth.currentUser)){
      return Promise.reject({message: 'Užívateľov môže pridávať len admin'});
    }

    const emailMock = this._auth.userNameToEmail(newUser.name);

    const data = {
      email: emailMock,
      name: newUser.name,
      roles: newUser.roles,
      password: pass
    };
    return this.afs.collection('newUsers').add(data);
  }
}
