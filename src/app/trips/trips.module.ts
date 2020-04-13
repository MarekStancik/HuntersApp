import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { SharedModule } from '../shared.module';
import { EditRecordViewComponent } from './edit-record-view/edit-record-view.component';
import { CheckInViewComponent } from './check-in-view/check-in-view.component';


@NgModule({
  declarations: [
    TripListComponent,
    CheckInViewComponent,
    EditRecordViewComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    SharedModule
  ]
})
export class TripsModule { }