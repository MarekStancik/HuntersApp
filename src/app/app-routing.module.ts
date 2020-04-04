import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';
import { EditRecordViewComponent } from './edit-record-view/edit-record-view.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
