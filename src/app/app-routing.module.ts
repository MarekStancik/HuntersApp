import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';


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
    path: "auth",
    loadChildren:() => import('./auth/auth.module').then(m=>m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
