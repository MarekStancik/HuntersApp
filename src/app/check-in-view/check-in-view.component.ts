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
    timeTo: new FormControl(''),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(new Date())
  });

  locations$ : Observable<LocationModel[]>;

  constructor(private tripService: TripService,
    private locService: LocationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.locations$ = this.locService.readAll();
    this.checkInForm.setControl('dateFrom',new FormControl(this.tripService.dateFilter));
    this.checkInForm.setControl('dateTo',new FormControl(this.tripService.dateFilter));
  }

  save(){
    const val = this.checkInForm.value;
    const from = new Date(val.dateFrom);    
    from.setHours(val.timeFrom.substr(0,2),val.timeFrom.substr(3,2),0,0);

    const to = new Date(val.dateTo);
    to.setHours(val.timeTo.substr(0,2),val.timeTo.substr(3,2),0,0);

    let trip: TripModel = {
      hunter: this.userService.getCurrentUser(),
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
          alert('Záznam bol zaevidovaný')
          this.router.navigate(['']);
        }
      })
  }
}
