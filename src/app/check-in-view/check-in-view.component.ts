import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../trips/shared/trip.service';
import { LocationModel } from '../locations/shared/location-model';
import { Observable } from 'rxjs';
import { LocationService } from '../locations/shared/location.service';
import { TripModel } from '../trips/shared/trip-model';
import { UserService } from '../users/shared/user.service';

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

  locations$ : Observable<LocationModel[]>;//LocationModel[];

  constructor(private tripService: TripService,private locService: LocationService,private userService: UserService) { }

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
    this.tripService.add(trip);
  }
}
