import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatToolbarModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class PublicModule { }
