import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared.module';
import { AdminLocationsViewComponent } from './admin-locations-view/admin-locations-view.component';
import { AdminMainViewComponent } from './admin-main-view/admin-main-view.component';
import { AdminUsersViewComponent } from './admin-users-view/admin-users-view.component';


@NgModule({
  declarations: [
    AdminLocationsViewComponent,
    AdminMainViewComponent,
    AdminUsersViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
