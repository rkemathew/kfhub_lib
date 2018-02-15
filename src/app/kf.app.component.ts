import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Spinkit } from 'ng-http-loader/spinkits';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { KFAuthService } from './modules/shared/services/kf.auth.service';
import { KFUtilsService } from './modules/shared/services/kf.utils.service';

@Component({
    selector: 'kf-root',
    templateUrl: './kf.app.component.html',
    styleUrls: [ './kf.app.component.less' ]
})
export class KFAppComponent {
    idleState = 'Not started.';
    timedOut = false;
    lastPing?: Date = null;
    public spinkit = Spinkit;
    
    constructor(
        private router: Router,
        private idle: Idle,
        private authService: KFAuthService,
        private utilsService: KFUtilsService
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
