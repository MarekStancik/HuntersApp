import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-in-view',
  templateUrl: './check-in-view.component.html',
  styleUrls: ['./check-in-view.component.scss']
})
export class CheckInViewComponent implements OnInit {

  checkInForm = new FormGroup({
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

  constructor() { }

  ngOnInit(): void {
  }

  save(){

  }
}
