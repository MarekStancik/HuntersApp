import { Component, OnInit, Input } from '@angular/core';
import { HuntingCatch } from '../shared/trip-model';

@Component({
  selector: 'app-catches-list',
  templateUrl: './catches-list.component.html',
  styleUrls: ['./catches-list.component.scss']
})
export class CatchesListComponent implements OnInit {

  @Input() catches: HuntingCatch[];

  constructor() { }

  ngOnInit(): void {
  }
}
