import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HuntingType, AnimalGender, ReasonOfDeath, TripModel } from '../trips/shared/trip-model';
import { TripsDataSource } from '../trips/shared/trips-data-source';
import { TripService } from '../trips/shared/trip.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements AfterViewInit,OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRow: TripModel;
  selectedDate: Date = new Date();
  private _filter: string= '';

  set filter(val:string){
    this._filter = val.trim().toLowerCase();
    this.paginator.firstPage();
  }

  constructor(private tripsService: TripService) { }

  ngOnInit() {
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
    if(confirm("Určite chcete vymazať svoj záznam?")){

    }
  }

}
