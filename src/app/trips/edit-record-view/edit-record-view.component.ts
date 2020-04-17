import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from '../shared/trip.service';
import { Observable } from 'rxjs';
import { LocationModel } from '../../locations/shared/location-model';
import { LocationService } from '../../locations/shared/location.service';
import { Router } from '@angular/router';
import { TripModel } from '../shared/trip-model';
import { MatDialog } from '@angular/material/dialog';
import { CatchDialogComponent } from '../catch-dialog/catch-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripsUtility } from '../shared/trips-utility';

@Component({
  selector: 'app-edit-record-view',
  templateUrl: './edit-record-view.component.html',
  styleUrls: ['./edit-record-view.component.scss']
})
export class EditRecordViewComponent implements OnInit {

  record: TripModel;

  editForm = new FormGroup({
      huntingType: new FormControl('',[Validators.required]),
      guest: new FormControl(''),
      timeFrom: new FormControl('',[Validators.required]),
      timeTo: new FormControl('',[Validators.required]),
      dateFrom: new FormControl(new Date(),[Validators.required]),
      dateTo: new FormControl(new Date(),[Validators.required]),
      note: new FormControl(''),
  });

  constructor(
    private _tripService: TripService,
    private _router: Router,
    public dialog: MatDialog,
    private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    if(!this._tripService.editedRecord){
      this._router.navigate(['trips']);
      return;
    }
    this.record = this._tripService.editedRecord;

    this.editForm.patchValue({
      guest: this.record.guest,
      dateFrom: this.record.timeFrom,
      dateTo: this.record.timeTo,
      huntingType: this.record.huntingType,
      timeFrom: TripsUtility.dateToTimeStr(this.record.timeFrom),
      timeTo: TripsUtility.dateToTimeStr(this.record.timeTo),
      note: this.record.note
    }); 
    
    this.updateDateToValidator(this.editForm.get('dateFrom').value);

    this.editForm.get('dateFrom')
      .valueChanges
      .subscribe(val => this.updateDateToValidator(val));   
  }

  private updateDateToValidator(val: Date){
    this.editForm.get('dateTo').setValidators([
      Validators.required,
      TripsUtility.minDateValidator(val)
    ]);
    this.editForm.get('dateTo').updateValueAndValidity();
  }

  openCatchDialog(){
    const dialogRef = this.dialog.open(CatchDialogComponent,{
      width: '250px',
      data: {
        trip: this.record
      }
    });
  }

  save(): void{
    const val = this.editForm.value;

    this.record.guest = val.guest;
    this.record.note = val.note;
    this.record.huntingType = val.huntingType;
    this.record.timeFrom =  TripsUtility.dateFromControlValue(this.editForm.value,'dateFrom','timeFrom');
    this.record.timeTo = TripsUtility.dateFromControlValue(this.editForm.value,'dateTo','timeTo');

    this._tripService.update(this.record)
      .then(() => {
        this._router.navigate(['/trips']);
        this._snackbar.open('Záznam uložený','OK',{duration: 2000});
      })
      .catch(err => {
        alert(err.message);
      })
  }

  getFromDate(): Date{
    return TripsUtility.dateFromControlValue(this.editForm.value,'dateFrom','timeFrom');
  }

  getToDate(): Date{
    return TripsUtility.dateFromControlValue(this.editForm.value,'dateTo','timeTo');
  }

  hasErrors(): boolean{
    return this.editForm.invalid || this.getFromDate() >= this.getToDate();
  }

}
