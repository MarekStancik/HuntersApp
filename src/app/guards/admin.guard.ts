import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private _authService: AuthService,private router: Router){

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      return this._authService.user$.pipe(
        take(1),
        map(user => user && user.roles.admin ? true : false),
        tap(isAdmin =>{ 
          if(!isAdmin) 
            this.router.navigate(['/login'])
        })
      )
  }
}
