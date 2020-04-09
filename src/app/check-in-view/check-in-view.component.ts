import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../trips/shared/trip.service';
import { LocationModel } from '../locations/shared/location-model';
import { Observable } from 'rxjs';
import { LocationService } from '../locations/shared/location.service';
import { TripModel } from '../trips/shared/trip-model';
import { UserService } from '../users/shared/user.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in-view',
  templateUrl: './check-in-view.component.html',
  styleUrls: ['./check-in-view.component.scss']
})
export class CheckInViewComponent implements OnInit {

  checkInForm = new FormGroup({
    location: new FormControl(''),
    huntingType: new FormControl(''),
    guest: new FormControl(''),
    timeFrom: new FormControl(''),
    timeTo: new FormControl('')
  });

  locations$ : Observable<LocationModel[]>;

  constructor(private tripService: TripService,
    private locService: LocationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.locations$ = this.locService.readAll();
  }

  save(){
    const val = this.checkInForm.value;
    let trip: TripModel = {
      date: new Date(),
      hunter: this.userService.getCurrentUser(),
      location: val.location,
      timeFrom: val.timeFrom,
      timeTo: val.timeTo,
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
          alert('Záznam bol zaevidovaný')
          this.router.navigate(['']);
        }
      })
  }
}
