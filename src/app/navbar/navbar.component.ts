import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginViewComponent } from '../users/login-view/login-view.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _authService: AuthService,private dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  showLogin(): void{
    const dialogRef = this.dialog.open(LoginViewComponent, {
      width: '250px',
      data: {auth: this._authService, router: this.router}
    });  
  }

  isAdminLogged():boolean{
    const user = this._authService.currentUser;
    return user && this._authService.isAdmin(user);
  }
}
