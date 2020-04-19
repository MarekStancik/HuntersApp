import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TripService } from '../shared/trip.service';
import { LocationModel } from '../../locations/shared/location-model';
import { Observable } from 'rxjs';
import { LocationService } from '../../locations/shared/location.service';
import { TripModel } from '../shared/trip-model';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../auth/shared/auth.service';
import { TripsUtility } from '../shared/trips-utility';

@Component({
  selector: 'app-check-in-view',
  templateUrl: './check-in-view.component.html',
  styleUrls: ['./check-in-view.component.scss']
})
export class CheckInViewComponent implements OnInit {

  checkInForm = new FormGroup({
    location: new FormControl('',[
      Validators.required
    ]),
    huntingType: new FormControl('',[
      Validators.required
    ]),
    guest: new FormControl(''),
    timeFrom: new FormControl('00:00',[
      Validators.required
    ]),
    timeTo: new FormControl('00:00',[
      Validators.required
    ]),
    dateFrom: new FormControl(new Date(),[
      Validators.required,
      TripsUtility.minDateValidator(new Date())
    ]),
    dateTo: new FormControl(new Date(),[
      Validators.required
    ])
  });

  locations$ : Observable<LocationModel[]>;

  constructor(
    private tripService: TripService,
    private locService: LocationService,
    private _authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.locations$ = this.locService.readAll();
    if(TripsUtility.compare(this.tripService.dateFilter,new Date()) === 1){
      this.checkInForm.setControl('dateFrom',new FormControl(this.tripService.dateFilter));
      this.checkInForm.setControl('dateTo',new FormControl(this.tripService.dateFilter));
    }
    this.updateDateToValidator(this.checkInForm.get('dateFrom').value);

    this.checkInForm.get('dateFrom')
      .valueChanges
      .subscribe(val => this.updateDateToValidator(val));   
  }

  private updateDateToValidator(val: Date){
    this.checkInForm.get('dateTo').setValidators([
      Validators.required,
      TripsUtility.minDateValidator(val)
    ]);
    this.checkInForm.get('dateTo').updateValueAndValidity();
  }

  hasErrors(): boolean{
    return this.checkInForm.invalid || this.getFromDate() >= this.getToDate();
  }

  getFromDate(): Date{
    return TripsUtility.dateFromControlValue(this.checkInForm.value,'dateFrom','timeFrom');
  }

  getToDate(): Date{
    return TripsUtility.dateFromControlValue(this.checkInForm.value,'dateTo','timeTo');
  }

  save(){
    if(this._authService.currentUser === null){
      alert('Musíte sa Prihlásiť, aby ste sa mohli zapísať');
      return;
    }

    const val = this.checkInForm.value;
    const from = this.getFromDate();  
    const to = this.getToDate();

    let trip: TripModel = {
      hunter: {
        id: this._authService.currentUser.id,
        name: this._authService.currentUser.name
      }, 
      location: val.location,
      timeFrom: from,
      timeTo: to,
      guest: val.guest
    };
    
    this.tripService.add(trip)
      .then(data => {
        if(data !== null){
          this._snackBar.open('Záznam uložený','OK',{duration: 2000});
          this.router.navigate(['']);
        }
      })
      .catch(err => alert(err.message))
  }
}
