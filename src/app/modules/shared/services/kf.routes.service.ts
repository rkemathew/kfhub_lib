import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { KFUtilsService } from './kf.utils.service';
import { KFLoginComponent } from '../components/auth/kf.login.component';

@Injectable()
export class KFRoutesService {
    constructor(
        public utilsService: KFUtilsService
    ) {}

    routes: Route[] = [
        { path: 'login', component: KFLoginComponent }
    ];
    
    getRoutes(): Route[] {
        return this.routes;
    }
}
