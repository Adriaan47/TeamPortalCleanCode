import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userSVC: UsersService, private router: Router) {}

  canActivate(next, state): Observable<boolean> {
    return this.userSVC.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.userSVC.notifcation('Access denied, unauthorized user', 'danger');
          this.router.navigate(['/login']);
        } 
      })
    )
  }
}
 