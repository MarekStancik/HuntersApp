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

  catchToString(c: HuntingCatch): string {
    return `Názov zvery: ${c.animal} Pohlavie zvery: ${c.gender} Dôvod úmrtia: ${c.reasonOfDeath} Číslo značky: ${c.markNumber}`;
  }
}
