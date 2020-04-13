import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginViewComponent } from './public/login-view/login-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },
  {
    path: 'trips',
    loadChildren:() => import('./trips/trips.module').then(m => m.TripsModule),
    canLoad: [LoginGuard]
  },
  {
    path: "admin",
    loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule),
    canLoad: [AdminGuard]
  },
  {
    path: "login",
    component: LoginViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
