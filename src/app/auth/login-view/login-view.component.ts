import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})

export class LoginViewComponent implements OnInit {

  email: string;

  password: string;

  error: string;
  constructor(
    private _authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  closeSuccess(){
    debugger
    this.router.navigate(['/trips'])
  }

  signIn(){
    this._authService.signIn(this.email,this.password)
      .then(() => {
        this.closeSuccess();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

}
