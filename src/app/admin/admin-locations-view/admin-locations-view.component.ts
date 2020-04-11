import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from 'src/app/locations/shared/location-model';
import { LocationService } from 'src/app/locations/shared/location.service';

@Component({
  selector: 'app-admin-locations-view',
  templateUrl: './admin-locations-view.component.html',
  styleUrls: ['./admin-locations-view.component.scss']
})
export class AdminLocationsViewComponent implements OnInit {

  newLocation: string;

  updatedName: string;

  selectedLoc: LocationModel;

  locations$: Observable<LocationModel[]>;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.readAll();
  }

  addLocation(locName: string){
    this.locationService.add(locName);
    this.newLocation = '';
  }

  updateLocation(loc: LocationModel,newName: string){
    loc.name = newName;
    this.locationService.update(loc);
  }

}
