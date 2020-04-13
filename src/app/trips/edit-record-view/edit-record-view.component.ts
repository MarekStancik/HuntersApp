import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../shared/trip.service';
import { Observable } from 'rxjs';
import { LocationModel } from '../../locations/shared/location-model';
import { LocationService } from '../../locations/shared/location.service';

@Component({
  selector: 'app-edit-record-view',
  templateUrl: './edit-record-view.component.html',
  styleUrls: ['./edit-record-view.component.scss']
})
export class EditRecordViewComponent implements OnInit {

  editForm = new FormGroup({
      location: new FormControl(''),
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

  locations$ : Observable<LocationModel[]>;

  constructor(private tripService: TripService,private locService:LocationService) { }

  ngOnInit(): void {
    this.locations$ = this.locService.readAll();
  }

  save(): void{
    
  }

}
