import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainViewComponent } from './admin-main-view/admin-main-view.component';
import { AdminLocationsViewComponent } from './admin-locations-view/admin-locations-view.component';
import { AdminUsersViewComponent } from './admin-users-view/admin-users-view.component';


const routes: Routes = [
  {
    path: '',
    component: AdminMainViewComponent
  },
  {
    path: "locations",
    component: AdminLocationsViewComponent
  },
  {
    path: "users",
    component: AdminUsersViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
