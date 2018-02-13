import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';

import { KFAuthService } from './modules/shared/services/kf.auth.service';
import { KFUtilsService } from './modules/shared/services/kf.utils.service';

@Component({
    selector: 'kf-root',
    templateUrl: './kf.app.component.html',
    styleUrls: [ './kf.app.component.less' ]
})
export class KFAppComponent {
    public spinkit = Spinkit;
    
    constructor(
        private router: Router,
        private authService: KFAuthService,
        private utilsService: KFUtilsService
    ){};

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }

    onLogout(event) {
        console.log('In onLogout event handler in App Component');
        this.authService.removeSessionInfo();
        this.router.navigate(['/login']);
    }
}
