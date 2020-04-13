import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  showLogin(): void{
    this.router.navigate(['/login']);
  }

  isAdminLogged():boolean{
    const user = this.authService.currentUser;
    return user && this.authService.isAdmin(user);
  }

  signOut(){
    this.authService.signOut()
      .then(() => this.showLogin());
  }
}
