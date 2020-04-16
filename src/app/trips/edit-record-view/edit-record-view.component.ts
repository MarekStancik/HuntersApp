import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../shared/trip.service';
import { Observable } from 'rxjs';
import { LocationModel } from '../../locations/shared/location-model';
import { LocationService } from '../../locations/shared/location.service';
import { Router } from '@angular/router';
import { TripModel } from '../shared/trip-model';

@Component({
  selector: 'app-edit-record-view',
  templateUrl: './edit-record-view.component.html',
  styleUrls: ['./edit-record-view.component.scss']
})
export class EditRecordViewComponent implements OnInit {

  record: TripModel;

  editForm = new FormGroup({
      huntingType: new FormControl(''),
      guest: new FormControl(''),
      timeFrom: new FormControl(''),
      timeTo: new FormControl(''),
      dateFrom: new FormControl(new Date()),
      dateTo: new FormControl(new Date()),
      animalGender: new FormControl(''),
      animalCount: new FormControl(''),
      markNumber: new FormControl(''),
      reasonOfDeath: new FormControl(''),
      note: new FormControl(''),
  });

  constructor(
    private _tripService: TripService,
    private _router: Router) { }

  ngOnInit(): void {
    if(this._tripService.editedRecord === null){
      this._router.navigate(['trips']);
      return;
    }
    this.record = this._tripService.editedRecord;

    this.editForm.patchValue({
      guest: this.record.guest,
      dateFrom: this.record.timeFrom,
      dateTo: this.record.timeTo
    });
  }

  save(): void{
    
  }

}
