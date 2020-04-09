import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): UserModel{
    return{id: '1',name: 'karol'};
  }
}
