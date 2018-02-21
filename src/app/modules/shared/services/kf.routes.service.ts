import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { KFUtilsService } from './kf.utils.service';
import { KFLoginComponent } from '../components/auth/kf.login.component';
import { KFInternalAppRouterComponent } from '../components/internal-router/kf.internal-app-router.component';

@Injectable()
export class KFRoutesService {
    constructor(
        public utilsService: KFUtilsService
    ) {}

    routes: Route[] = [
        { path: 'login', component: KFLoginComponent },
        { path: 'redirect', component: KFInternalAppRouterComponent },
    ];
    
    getRoutes(): Route[] {
        return this.routes;
    }
}
