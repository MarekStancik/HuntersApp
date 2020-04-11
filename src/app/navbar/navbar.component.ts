import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/shared/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginViewComponent } from '../users/login-view/login-view.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService,private dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  showLogin(): void{
    const dialogRef = this.dialog.open(LoginViewComponent, {
      width: '250px',
      data: {auth: this.userService, router: this.router}
    });  
  }
}
