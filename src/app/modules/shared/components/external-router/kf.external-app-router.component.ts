import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KFAuthService } from '../../services/kf.auth.service';

const EXTERNAL_APP_REDIRECT_BASE_PATH = '/successprofile.html#/sessionhandoff?redirectTo=';

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
        const externalRoutePath = (this.activatedRoute.routeConfig.data && this.activatedRoute.routeConfig.data.externalRoutePath) ?
            this.activatedRoute.routeConfig.data.externalRoutePath : '';

        this.authService.transferSessionInfoToLocalStorage();
        window.location.href = this.getExternalAppRedirectPath(externalRoutePath);
    }

    getExternalAppRedirectPath(externalRoutePath: string): string {
        return window.location.origin + EXTERNAL_APP_REDIRECT_BASE_PATH + externalRoutePath;
    }
}
