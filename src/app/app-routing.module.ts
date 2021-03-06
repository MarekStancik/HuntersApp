import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginViewComponent } from './public/login-view/login-view.component';
import { LogoutGuard } from './guards/logout.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'trips',
    pathMatch: 'full'
  },
  {
    path: "admin",
    loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule),
    canLoad: [AdminGuard]
  },
  {
    path: 'trips',
    loadChildren:() => import('./trips/trips.module').then(m => m.TripsModule),
    canLoad: [LoginGuard]
  },
  {
    path: "login",
    component: LoginViewComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: '**',
    redirectTo: 'trips',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
