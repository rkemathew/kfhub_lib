import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { KFMenuItem } from './modules/shared/models/kf.menu-item.model';
import { KFAuthService } from './modules/shared/services/kf.auth.service';
import { KFUtilsService } from './modules/shared/services/kf.utils.service';
import { KFRoutesService } from './modules/shared/services/kf.routes.service';
import { KFSandboxMainComponent } from './modules/sanboxes/main/kf.sandbox-main.component';
import { KFExternalAppRouterComponent } from './modules/shared/components/external-router/kf.external-app-router.component';

const INITIAL_ROUTE_PATH: string = 'tarc/jd/search';
const DEFAULT_ROUTE_PATH: string = 'login';

@Component({
    selector: 'kf-root',
    templateUrl: './kf.app.component.html',
    styleUrls: [ './kf.app.component.less' ]
})
export class KFAppComponent implements OnInit {
    idleState = 'Not started.';
    menuItems: KFMenuItem[] = null;
    timedOut = false;
    lastPing?: Date = null;
    public spinkit = Spinkit;
    
    constructor(
        private router: Router,
        private idle: Idle,
        private authService: KFAuthService,
        private utilsService: KFUtilsService,
        private kfRoutesService: KFRoutesService
    ) {
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(5);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(5);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
        });

        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

        this.reset();
    }

    ngOnInit() {
        this.menuItems = this.getMenuItems();
        this.router.resetConfig(this.getRoutes());
    }

    getMenuItems(): KFMenuItem[] {
        const pmSubMenuSP = new KFMenuItem('BCSuccessProfiles', 'tarc/sp/search');
        const pmSubMenuJD = new KFMenuItem('JobDescriptionsPageTitle', 'tarc/jd/search');
        const pmMainMenu = new KFMenuItem('Talent', 'tarc/sp/search', [ pmSubMenuSP, pmSubMenuJD ]);

        const taSubMenuAP = new KFMenuItem('Assessment Projects', 'tacq/ap/projsearch');
        const taMainMenu = new KFMenuItem('TalentAcquisition', 'tacq/ap/projsearch', [ taSubMenuAP ]);

        const opSubMenuPay = new KFMenuItem('Pay', 'orgp/pay/new');
        const opSubMenuOrgSetup = new KFMenuItem('Organization Setup', 'orgp/orgsetup/leaderboard');
        const opSubMenuOrgSurveys = new KFMenuItem('Organization Surveys', 'orgp/orgsurvey/surveyslist');
        const opMainMenu = new KFMenuItem('OrganizationPerformance', 'orgp/pay/new', [ opSubMenuPay, opSubMenuOrgSetup, opSubMenuOrgSurveys ]);

        return [ pmMainMenu, taMainMenu, opMainMenu ];
    }

    getRoutes(): Route[] {
        let routes: Route[] = [];
        routes.push(this.getInitialRoute());
        this.getKFRoutes().forEach((route: Route) => routes.push(route));
        routes.push(this.getDefaultRoute());
        return routes;
    }

    getInitialRoute(): Route {
        return { path: '', redirectTo: INITIAL_ROUTE_PATH, pathMatch: 'full' };
    }

    getDefaultRoute(): Route {
        return { path: '**', redirectTo: DEFAULT_ROUTE_PATH, pathMatch: 'full' };
    }

    getKFRoutes(): Route[] {
        let routes: Route[] = [
            { path: 'tarc/jd/search', component: KFSandboxMainComponent },
            { path: 'tacq/ap/projsearch', component: KFExternalAppRouterComponent, data: { externalRoutePath: 'talentacquisition/tacqprojectsearch'} }
        ];

        routes.push.apply(routes, this.kfRoutesService.getRoutes());

        return routes;
    }

    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    isAppPages(): boolean {
        return this.utilsService.isAppPages();
    }

    onLogout(event) {
        console.log('In onLogout event handler in App Component');
        this.authService.removeSessionInfo();
        this.router.navigate(['/login']);
    }
}
