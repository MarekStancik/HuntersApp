import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../trips/shared/trip.service';

@Component({
  selector: 'app-edit-record-view',
  templateUrl: './edit-record-view.component.html',
  styleUrls: ['./edit-record-view.component.scss']
})
export class EditRecordViewComponent implements OnInit {

  editForm = new FormGroup({
    location: new FormControl('',[
      Validators.required,
      Validators.minLength(4)
    ]),
    photoURL: new FormControl(''),
    age: new FormControl(''),
    summary: new FormControl(''),
    timeFrom: new FormControl(''),
    timeTo: new FormControl('')
  });

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
  }

  save(): void{
    
  }

}
