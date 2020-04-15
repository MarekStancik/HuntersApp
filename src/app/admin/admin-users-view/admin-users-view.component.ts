import { Component, OnInit } from '@angular/core';
import { UserModel, UserRole } from 'src/app/users/shared/user-model';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  showForm = false;
  isEditing = false;

  selectedRow : UserModel;

  dataSource: UserModel[];

  displayedColumns: string[] = [
    'name', 'rules'
  ];

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._userService.readAll()
      .subscribe(data => this.dataSource = data);
  }

  getRecord(row: UserModel){
    this.selectedRow = row;
  }

  getRoleForUser(user: UserModel): string{
    return user.roles.admin ? 'admin' : 'polovnik';
  }

  getRoles():string[]{
    return ['admin','polovnik'];
  }

  getRole(role: string): UserRole{
    return role == 'admin' ? {admin: true} : {hunter: true};
  }

  saveUser(){
    const val = this.userForm.value;
    let user : UserModel = {
      id: '',
      email: '',
      name: val.username,
      roles: this.getRole(val.role)
    };

    let prom : Promise<any> = null;
    if(this.isEditing){
      user.id = this.selectedRow.id;
      user.email = this.selectedRow.email;
      user.name = this.selectedRow.name;
      prom = this._userService.updateUser(user);
    }
    else{
      prom = this._authService.addUser(user,val.password);
    }

    prom.then(()=> {
      this.showForm = false;
      this._snack.open('Uživateľ uložený','OK',{duration: 2000});
    })
    .catch(err => alert(err.message));
  }

  showForAdding(){
    this.showForm = true;
    this.isEditing = false;
    this.userForm.patchValue({
      username: '',
      password: '',
      role: 'polovnik'
    });
  }

  showForEdit(){
    this.showForm = this.isEditing = true;
    this.userForm.setControl('username',new FormControl(this.selectedRow.name));
    this.userForm.setControl('role',new FormControl(this.getRoleForUser(this.selectedRow)));
  }
}
