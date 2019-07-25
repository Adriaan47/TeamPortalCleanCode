import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router, private user: UsersService) {
    }

    async canActivate(route) {
        if (await this.user.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
