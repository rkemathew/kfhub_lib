import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KFAuthService } from '../../services/kf.auth.service';

const EXTERNAL_APP_BASE_PATH = 'http://localhost:3000/successprofile.html#/sessionhandoff?redirectTo=';

@Component({
    selector: 'kf-external-app-router',
    templateUrl: './kf.external-app-router.component.html',
    styleUrls: ['./kf.external-app-router.component.less']
})
export class KFExternalAppRouterComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: KFAuthService
    ) { }

    ngOnInit() {
        console.log('this.activatedRoute.routeConfig.redirectTo', this.activatedRoute.routeConfig.data);
        const externalRoutePath = this.activatedRoute.routeConfig.data && this.activatedRoute.routeConfig.data.externalRoutePath ?
            this.activatedRoute.routeConfig.data.externalRoutePath : '';

        this.authService.transferSessionInfoToLocalStorage();
        window.location.href = EXTERNAL_APP_BASE_PATH + externalRoutePath;
    }
}
