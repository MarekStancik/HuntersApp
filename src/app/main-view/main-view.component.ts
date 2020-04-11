import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HuntingType, AnimalGender, ReasonOfDeath, TripModel } from '../trips/shared/trip-model';
import { TripsDataSource } from '../trips/shared/trips-data-source';
import { TripService } from '../trips/shared/trip.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../users/shared/user.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements AfterViewInit,OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRow: TripModel;
  private _filter: string= '';

  set filter(val:string){
    this._filter = val.trim().toLowerCase();
    this.paginator.firstPage();
    this.loadTripsPage();
  }

  get filter(){
    return this._filter;
  }

  get selectedDate(){
    return this.tripsService.dateFilter;
  }

  set selectedDate(date :Date){
    this.tripsService.dateFilter = date;
    this.paginator.firstPage();
    this.loadTripsPage();
  }

  constructor(private tripsService: TripService,private userService: UserService) { }

  ngOnInit() {
    const date = new Date(); 
    const seed: TripModel[] = [
      {
        hunter: this.userService.currentUser,
        location: {id: '1',name: 'Jazero'},
        timeFrom: new Date(),
        timeTo: new Date(),
        guest: 'Peto'
      },
      {
        hunter: this.userService.currentUser,
        location: {id: '1',name: 'Jazero'},
        timeFrom: new Date(),
        timeTo: new Date(),
        guest: 'Jozo'
      },
      {
        hunter: this.userService.currentUser,
        location: {id: '1',name: 'Jazero'},
        timeFrom: new Date(),
        timeTo: new Date(),
        guest: 'Jano'
      },
      {
        hunter: this.userService.currentUser,
        location: {id: '1',name: 'Jazero'},
        timeFrom: new Date(),
        timeTo: new Date(),
        guest: 'Fero'
      },
      {
        hunter: this.userService.currentUser,
        location: {id: '2',name: 'Kostolne'},
        timeFrom: new Date(),
        timeTo: new Date(),
      }
    ];
    seed.forEach(trip => this.tripsService.add(trip));
    this.dataSource = new TripsDataSource(this.tripsService);
    this.loadTripsPage();
  }

  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.loadTripsPage())
        )
        .subscribe();
  }

  loadTripsPage(): void {
    this.dataSource.loadTrips(this.selectedDate,this.filter,this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  displayedColumns: string[] = [
    'locationName', 'hunterName', 'hunterHost',
    'huntingType','time','animalGender',
    'animalCount','reasonOfDeath','markNumber','note'
  ];

  dataSource : TripsDataSource; 

  getRecord(row: TripModel){
    this.selectedRow = row;
    //this.selected.emit(row);
  }

  deleteRecord(row: TripModel){
    if(this.canEdit(row) && confirm("Určite chcete vymazať svoj záznam?")){
      this.tripsService.deleteTrip(row);
      this.loadTripsPage();
    }
  }

  private toTimeStr(date: Date): string{
    let rval = '';
    if(date.getHours() < 10)
      rval = '0' + date.getHours();
    else
      rval += date.getHours();

    rval += ':';

    if(date.getMinutes() < 10)
      rval += '0' + date.getMinutes();
    else
      rval += date.getMinutes();      
    return rval;
  }

  asDateString(row: TripModel):string{
    if(row){
      const date = row.timeFrom;
      const date2 = row.timeTo;
      if(date.toLocaleDateString().localeCompare(date2.toLocaleDateString()) === 0){
        return `${date.toLocaleDateString()} ${this.toTimeStr(date)} - ${this.toTimeStr(date2)}`;
      }
      return  `${date.toLocaleDateString()} ${this.toTimeStr(date)} - ${date2.toLocaleDateString()} ${this.toTimeStr(date2)}`;
    }
    return '';
  }

  canEdit(row: TripModel):boolean{
    const user = this.userService.currentUser;
    return row && user && (row.hunter === user || this.userService.isAdmin(user));
  }

}
