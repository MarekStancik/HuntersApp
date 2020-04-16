import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TripModel, HuntingCatch } from '../shared/trip-model';
import { TripsDataSource } from '../shared/trips-data-source';
import { TripService } from '../shared/trip.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  selectedRow: TripModel;
  private _filter: string= '';

  set filter(val:string){
    this._filter = val.trim().toLowerCase();
  }

  get filter(){
    return this._filter;
  }

  get selectedDate(){
    return this.tripsService.dateFilter;
  }

  set selectedDate(date :Date){
    this.tripsService.dateFilter = date;
    this.filterRecords();
  }

  constructor(private tripsService: TripService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.dataSource = new TripsDataSource(this.tripsService);
    this.loadTripsPage();
  }

  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(
        tap(() => this.loadTripsPage())
    )
    .subscribe();
  }

  loadTripsPage(): void {
    this.dataSource.loadTrips(this.selectedDate,this.filter, this.paginator.pageIndex, this.paginator.pageSize);
  }

  displayedColumns: string[] = [
    'locationName', 'hunterName', 'hunterHost','huntingType','time','note'
  ];

  dataSource : TripsDataSource; 

  getRecord(row: TripModel){
    this.selectedRow = row;
    this.tripsService.editedRecord = row;
  }

  deleteRecord(row: TripModel){
    if(this.canEdit(row) && confirm("Určite chcete vymazať svoj záznam?")){
      this.tripsService.deleteTrip(row);
    }
  }

  filterRecords(){
    this.paginator.firstPage();
    this.loadTripsPage();
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
    const user = this._authService.currentUser;
    return row && user && (row.hunter === user || this._authService.isAdmin(user));
  }
}
