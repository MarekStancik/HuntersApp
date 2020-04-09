import { TripModel } from './trip-model';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TripService } from './trip.service';

export class TripsDataSource implements DataSource<TripModel> {
    private tripsSubject = new BehaviorSubject<TripModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private tripsService: TripService) {}

    connect(collectionViewer: CollectionViewer): Observable<TripModel[]> {
        return this.tripsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tripsSubject.complete();
        this.loadingSubject.complete();
    }

    loadTrips(date: Date,filter: string,sortDirection = "asc",pageIndex = 0,pageSize = 5) {

        this.loadingSubject.next(true);

        this.tripsService.readTrips(date,filter,sortDirection,pageIndex,pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).
            subscribe(trip => this.tripsSubject.next(trip));
    }     
}
