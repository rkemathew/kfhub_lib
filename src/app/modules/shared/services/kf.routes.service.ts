import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

import { KFLoginComponent } from '../components/auth/kf.login.component';

const routes: Route[] = [
    { path: 'login', component: KFLoginComponent }
];

@Injectable()
export class KFRoutesService {
    getRoutes(): Route[] {
        return routes;
    }
}
