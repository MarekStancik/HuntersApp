import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripModel } from '../shared/trip-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface CatchDialogData{
  trip: TripModel;
}

@Component({
  selector: 'app-catch-dialog',
  templateUrl: './catch-dialog.component.html',
  styleUrls: ['./catch-dialog.component.scss']
})
export class CatchDialogComponent implements OnInit {

  form = new FormGroup({
    animal: new FormControl('',[
      Validators.required
    ]),
    gender: new FormControl('',[
      Validators.required
    ]),
    reasonOfDeath: new FormControl('',[
      Validators.required
    ]),
    markNumber: new FormControl('',[
      Validators.required
    ])
  })

  constructor(
    public dialogRef: MatDialogRef<CatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CatchDialogData) { }

  ngOnInit(): void {
  }

  save(){
    this.dialogRef.close();
    if(!this.data.trip.catches){
      this.data.trip.catches = [];
    }

    const val = this.form.value;

    this.data.trip.catches.push({
      animal: val.animal,
      gender: val.gender,
      markNumber: val.markNumber,
      reasonOfDeath: val.reasonOfDeath
    })
  }

  hasErrors():boolean{
    return this.form.invalid;
  }
}
