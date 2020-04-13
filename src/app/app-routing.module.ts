import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';
import { EditRecordViewComponent } from './edit-record-view/edit-record-view.component';
import { AdminMainViewComponent } from './admin/admin-main-view/admin-main-view.component';
import { AdminLocationsViewComponent } from './admin/admin-locations-view/admin-locations-view.component';
import { AdminUsersViewComponent } from './admin/admin-users-view/admin-users-view.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: MainViewComponent
  },
  {
    path: 'checkin',
    component: CheckInViewComponent
  },
  {
    path: "edit",
    component: EditRecordViewComponent
  },
  {
    path: "admin",
    loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule),
    canLoad: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
