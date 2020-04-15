import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from 'src/app/locations/shared/location-model';
import { LocationService } from 'src/app/locations/shared/location.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-locations-view',
  templateUrl: './admin-locations-view.component.html',
  styleUrls: ['./admin-locations-view.component.scss']
})
export class AdminLocationsViewComponent implements OnInit {

  newLocation = new FormControl('',[
    Validators.minLength(3)
  ]);

  updatedLocation = new FormControl('',[
    Validators.minLength(3)
  ]);

  selectedLoc: LocationModel;

  locations$: Observable<LocationModel[]>;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locations$ = this.locationService.readAll();
  }

  hasAddError(): boolean{
    return this.newLocation.hasError('minlength');
  }

  hasUpdateError(): boolean{
    return this.updatedLocation.hasError('minlength');
  }

  getErrorMsg():string{
    return 'Lokácia musí obsahovať aspoň 3 znaky';
  }

  addLocation(){
    if(this.newLocation.value === ''){
      return;
    }
      
    this.locationService.add(this.newLocation.value);
    this.newLocation.setValue('');
  }

  updateLocation(){
    if(this.updatedLocation.value === ''){
      return;
    }

    this.locationService.update(this.selectedLoc,this.updatedLocation.value)
    .then(() =>{ 
      this.updatedLocation.setValue('')
      this.selectedLoc = null;
    })
  }

}
