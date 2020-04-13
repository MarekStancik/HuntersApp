import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared.module';
import { LoginViewComponent } from './login-view/login-view.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LoginViewComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatToolbarModule,
  ],
  exports: [
    NavbarComponent,
    LoginViewComponent
  ]
})
export class PublicModule { }
