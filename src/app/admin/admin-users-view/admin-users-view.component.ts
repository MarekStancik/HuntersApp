import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/users/shared/user-model';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.scss']
})
export class AdminUsersViewComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('')
  });

  selectedRow : UserModel;

  dataSource: UserModel[];

  constructor(
    private _userService: UserService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this._userService.readAll()
      .subscribe(data => this.dataSource = data);
  }

  getRecord(row: UserModel){
    this.selectedRow = row;
  }

  displayedColumns: string[] = [
    'name', 'rules'
  ];

  getRules(row: UserModel): string{
    return row.roles.admin ? 'admin' : 'polovník';
  }

  addUser(username: string,pass: string){
    this._authService.addUser(username,pass)
      .then()
      .catch(err => alert(err.message));
  }

  getRoleForUser(user: UserModel): string{
    for(const role of this.getRoles()){
      if(user.roles[role] == true)
        return role;
    }
    return '';
  }

  getRoles():string[]{
    return ['admin','polovnik'];
  }
}
