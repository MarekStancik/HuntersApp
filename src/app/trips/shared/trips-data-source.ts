import { TripModel } from './trip-model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { TripService } from './trip.service';

export class TripsDataSource implements DataSource<TripModel> {
    private tripsSubject = new BehaviorSubject<TripModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    public totalCount$ = this.countSubject.asObservable();

    constructor(private tripsService: TripService) {}

    connect(collectionViewer: CollectionViewer): Observable<TripModel[]> {
        return this.tripsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tripsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadTrips(date: Date,filter: string,sortDirection = "asc",pageIndex = 0,pageSize = 5) {

        this.loadingSubject.next(true);

        this.tripsService.readTrips(date,filter,sortDirection,pageIndex,pageSize)
            .pipe(
                catchError(() => of({trips: [],totalLength: 0})),
                tap(() => this.loadingSubject.next(false))
            ).
            subscribe(collection =>{ 
                this.tripsSubject.next(collection.trips),
                this.countSubject.next(collection.totalLength);
            });
    }     
}
