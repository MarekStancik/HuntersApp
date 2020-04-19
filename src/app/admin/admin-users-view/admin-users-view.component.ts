import { Component, OnInit } from '@angular/core';
import { UserModel, UserRole } from 'src/app/users/shared/user-model';
import { UserService } from 'src/app/users/shared/user.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users-view',
  templateUrl: './admin-users-view.component.html',
  styleUrls: ['./admin-users-view.component.scss']
})
export class AdminUsersViewComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(8),
    ]),
    role: new FormControl('',[
      Validators.required
    ])
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

  //----------Error matchers-----------//

  private getUsernameControl(){
    return this.userForm.get('username');
  }

  hasUsernameError(): boolean{
    const control = this.getUsernameControl();
    return control.hasError('required') || control.hasError('minlength');
  }

  getUsernameError(): string{
    if(this.hasUsernameError()){
      const control = this.getUsernameControl();
      if(control.hasError('required'))
        return 'Meno musí byť vyplnené';
      else if(control.hasError('minlength')){
        return 'Minimálna dĺžka mena sú 4 znaky';
      }
    }
    return '';
  }

  private getPasswordControl(){
    return this.userForm.get('password');
  }

  hasPasswordError(): boolean{
    const control = this.getPasswordControl();
    return control.hasError('required') || control.hasError('minlength');
  }

  getPasswordError(): string{
    if(this.hasPasswordError()){
      const control = this.getPasswordControl();
      if(control.hasError('required'))
        return 'Heslo musí byť vyplnené';
      else if(control.hasError('minlength')){
        return 'Minimálna dĺžka hesla je 8 znakov';
      }
    }
    return '';
  }

  hasRoleError():boolean{
    return this.userForm.get('role').hasError('required');
  }

  isSaveDisabled():boolean{
    if(this.isEditing){
      return this.hasRoleError();
    }
    else{
      return this.hasPasswordError() || this.hasUsernameError() || this.hasRoleError();
    }
  }


  //-----------Other stuff-----------//

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
      if(user.roles.admin === this.selectedRow.roles.admin)
        return;
      user.id = this.selectedRow.id;
      user.email = this.selectedRow.email;
      user.name = this.selectedRow.name;
      prom = this._userService.updateUser(user);
    }
    else{
      prom = this._userService.createUser(user,val.password);
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

  deleteUser(){
    if(!this.selectedRow){
      alert('Musíte vybrať užívateľa ktorého chcete vymazať');
      return;
    }


    if(confirm(`Ste si istý že chcete vymazať užívateľa: '${this.selectedRow.name}' ?`)){
      this._userService.deleteUser(this.selectedRow.id)
      .then(() =>{ 
        this._snack.open(`Užívateĺ '${this.selectedRow.name}' bol vymazaný`,'OK',{duration: 2000})
        this.selectedRow = null;
      })
      .catch(err => alert(err.message));
    }
  }
}
