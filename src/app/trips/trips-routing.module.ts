import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripListComponent } from './trip-list/trip-list.component';
import { EditRecordViewComponent } from './edit-record-view/edit-record-view.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';


const routes: Routes = [
  {
    path: '',
    component: TripListComponent
  },
  {
    path: 'edit',
    component: EditRecordViewComponent
  },
  {
    path: 'checkin',
    component: CheckInViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
