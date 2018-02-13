import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { KFAuthService } from './kf.auth.service';

@Injectable()
export class KFAuthGuardService implements CanActivate {
    constructor(
        public authService: KFAuthService,
        public router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            const url: string = state.url;
            this.authService.setRedirectUrl(url);
            this.router.navigate(['/login']);
            return false;
        }
    }
}
