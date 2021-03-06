import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})

export class LoginViewComponent implements OnInit {

  isLogging = false;

  name: string;

  password: string;

  error: string;
  constructor(
    private _authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  closeSuccess(){
    this.router.navigate([''])
  }

  signIn(){
    this.isLogging = true;
    this._authService.signIn(this.name,this.password)
      .then(() => {
        this.closeSuccess();
      })
      .catch(err => {
        console.log(err);
        
        this.error = err.message;
      })
      .finally(() => this.isLogging = false)
  }

}
