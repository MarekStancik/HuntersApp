import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { TripService } from '../shared/trip.service';
import { LocationModel } from '../../locations/shared/location-model';
import { Observable } from 'rxjs';
import { LocationService } from '../../locations/shared/location.service';
import { TripModel } from '../shared/trip-model';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../auth/shared/auth.service';
import { Time } from '@angular/common';

function compare(a: Date,b: Date):number{
  let ac = new Date(a);
  let bc = new Date(b);
  ac.setHours(0,0,0,0);
  bc.setHours(0,0,0,0);

  if(ac < bc)
    return -1;
  else if(ac > bc)
    return 1;
  return 0;
}

function minDateValidator(date: Date): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} | null => {
    if(compare(control.value,date) === -1){
      return {'minDate': {value: control.value}};
    }
    return null;
  };
}

function timeFromFormControl(val: string): Time{
  if(val){
    return {hours:parseInt(val.substr(0,2)),minutes: parseInt(val.substr(3,2))}; 
  }
  return {hours:0,minutes: 0};
}


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
      minDateValidator(new Date())
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
    if(compare(this.tripService.dateFilter,new Date()) === 1){
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
      minDateValidator(val)
    ]);
    this.checkInForm.get('dateTo').updateValueAndValidity();
  }

  hasErrors(): boolean{
    return this.checkInForm.invalid || this.getFromDate() >= this.getToDate();
  }

  getFromDate(): Date{
    const val = this.checkInForm.value;
    const from = new Date(val.dateFrom);    
    const fromTime = timeFromFormControl(val.timeFrom);
    from.setHours(fromTime.hours,fromTime.minutes,0,0);
    return from;
  }

  getToDate(): Date{
    const val = this.checkInForm.value;
    const to = new Date(val.dateTo);
    const toTime = timeFromFormControl(val.timeTo);
    to.setHours(toTime.hours,toTime.minutes,0,0);
    return to;
  }

  save(){
    if(this._authService.currentUser === null){
      alert('Musíte sa Prihlásiť, aby ste sa mohli zapísať');
      return;
    }
    const val = this.checkInForm.value;
    const from = this.getFromDate();  
    const to = this.getToDate();

    if(to < from){
      return;
    }

    let trip: TripModel = {
      hunter: this._authService.currentUser,
      location: val.location,
      timeFrom: from,
      timeTo: to,
      guest: val.guest
    };
    
    this.tripService.add(trip)
      .pipe(
        catchError(err => {
          alert(err)
          return null;
        })
      ).subscribe(data => {
        if(data !== null){
          this._snackBar.open('Záznam uložený','OK',{duration: 2000});
          this.router.navigate(['']);
        }
      })
  }
}
