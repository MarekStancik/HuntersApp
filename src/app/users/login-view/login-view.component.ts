import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export interface DialogLoginData{
  auth: AuthService;
  router: Router;
}

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  
  isSignedIn = false;

  email: string;

  password: string;

  error: string;
  constructor(public dialogRef: MatDialogRef<LoginViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogLoginData) { }

  ngOnInit() {
  }

  closeSuccess(){
    this.isSignedIn = true;
    this.dialogRef.close();
    //this.data.router.navigate(['/user/profile'])
  }

  signIn(){
    this.data.auth.signIn(this.email,this.password)
      .then(() => {
        this.closeSuccess();
      })
      .catch(err => {
        this.error = err.message;
      });
  }

}
