import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export enum HuntingType{

}

export enum ReasonOfDeath{
  U,
  N
}

export enum AnimalGender{
  M,
  F
}

export interface Record{
  locationName: string;
  hunterName: string;
  hunterHost?: string;
  huntingType?: HuntingType;
  time: string;
  animalGender?: AnimalGender;
  animalCount: number;
  reasonOfDeath?: ReasonOfDeath;
  markNumber?: number;
  note?: string;
}

const RECORD_DATA: Record[] = [
  {locationName: "kostolne",hunterName: "Dušan",hunterHost: "Miro",
    time: "12:00 - 16:00",animalCount: 1,animalGender: AnimalGender.M,reasonOfDeath: ReasonOfDeath.U,markNumber: 20,note: 'Joža prešlo auto'},
  {locationName: "tvrdosin",hunterName: "Jozef",hunterHost: "",time: "14:00 - 18:00",animalCount: 0}
];


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRow: Record;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    'locationName', 'hunterName', 'hunterHost',
    'huntingType','time','animalGender',
    'animalCount','reasonOfDeath','markNumber','note'
  ];
  dataSource = new MatTableDataSource<Record>(RECORD_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(row: Record){
    this.selectedRow = row;
    //this.selected.emit(row);
  }

  deleteRecord(row: Record){
    if(confirm("Určite chcete vymazať svoj záznam?")){

    }
  }

}
