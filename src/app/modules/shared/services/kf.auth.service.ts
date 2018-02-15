import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { KFUser } from '../models/kf.user.model';
import { KFSessionInfo } from '../models/kf.session-info.model';
import { KFLoginInfo } from '../models/kf.login-info.model';
import { KFSharedConstantsService} from './kf.shared-constants.service';

const SESSION_TIMEOUT_IN_MILLIS: number = 1200000; // 20 Minutes
const AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS: number = 900000; // 15 Minutes
const SESSION_STORAGE_INFO: string = 'sessionInfo';
const TRANSITION_STORAGE_INFO: string = 'transitionSessionInfo';

@Injectable()
export class KFAuthService {
    private redirectUrl: string = null;
    private sessionInfoCache: KFSessionInfo = null;

    constructor(
        private router: Router,
        private http: HttpClient,
        private sharedConstants: KFSharedConstantsService
    ) {}

    public login(loginInfo: KFLoginInfo): Observable<any> {
        const url: string = this.sharedConstants.getLoginUrl();
        const body: Object = {
            "username": loginInfo.Username,
            "password": loginInfo.Password
        };
        const headers: HttpHeaders = new HttpHeaders().set("applicationName", this.sharedConstants.APP_NAME_CORE);
        return this.http.post(url, body, { headers })
            .map((response: any) => response.data)
            .catch((error: any) => Observable.throw(error));
    }

    public getUser(userId: number): Observable<any> {
        var method = 'GET';
        var url = this.sharedConstants.getUsersUrl(userId);
        var headers = null;
        var data = null;
        var isReturnFullResponse = false;

        return this.authHttpCall(method, url, data, headers, isReturnFullResponse);
    };

    public isAuthenticated(): boolean {
        const sessionInfo: KFSessionInfo = this.getSessionInfo();
        const authTokenRefreshTime: Date = sessionInfo ? sessionInfo.AuthTokenRefreshTime : null;
        const loggedInTime: Date = sessionInfo ? sessionInfo.LoggedInTime : null;
        const lastActivityTime: Date = sessionInfo ? sessionInfo.LastActivityTime : null;

        const now = new Date().getTime();
        const lastActivityElapsedTime = lastActivityTime ? now - lastActivityTime.getTime() : -1;
        const authTokenElapsedTime = authTokenRefreshTime ? now - authTokenRefreshTime.getTime() : -1;
        
        if (lastActivityElapsedTime > -1 && lastActivityElapsedTime < SESSION_TIMEOUT_IN_MILLIS) {
            if (authTokenElapsedTime > -1 && authTokenElapsedTime < AUTHTOKEN_REFRESH_TIMEOUT_IN_MILLIS) {
                // Update the lastActivityTime since there has been a user action
                const updateAttributes: any = {
                    lastActivityTime: new Date()
                };

                this.updateSessionInfo(updateAttributes);

                return true;
            } else {
                // Time Threshold for re-verifying the AuthToken has elapsed, so re-verifying with a getUser() call
                console.log('AuthTokenRefresh Threshold Elapsed, re-verifying authToken again getUser() API');
                const userId = sessionInfo.User.UserId;
                this.getUser(userId).subscribe((res) => {
                    // Update the lastActivityTime since there has been a user action
                    // Also, update the authTokenRefreshTime as it just got re-verified against the getUser() API
                    const updateAttributes: any = {
                        authTokenRefreshTime: new Date(),
                        lastActivityTime: new Date()
                    };

                    // Update the authTokenRefreshTime in sessionStorage
                    this.updateSessionInfo(updateAttributes);

                    return true;
                }, () => {
                    this.removeSessionInfo();
                    return false;
                });
            }
        } else {
            this.removeSessionInfo();
            return false;
        }
    }

    public storeSessionInfo(authInfo: any): void {
        const user: KFUser = new KFUser(authInfo);
        const now = new Date();
        const sessionInfo: KFSessionInfo = new KFSessionInfo(user, now, now, now);
        this.sessionInfoCache = sessionInfo;
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public updateSessionInfo(updateAttributes: any): void {
        const sessionInfo: KFSessionInfo = this.getSessionInfo();
        if (updateAttributes.User) {
            sessionInfo.User = updateAttributes.User;
            console.log('User got updated in sessionInfo');
        }

        if (updateAttributes.authTokenRefreshTime) {
            sessionInfo.AuthTokenRefreshTime = updateAttributes.authTokenRefreshTime;
            console.log('authTokenRefreshTime got updated in sessionInfo');
        }

        if (updateAttributes.loggedInTime) {
            sessionInfo.LoggedInTime = updateAttributes.loggedInTime;
            console.log('loggedInTime got updated in sessionInfo');
        }

        if (updateAttributes.lastActivityTime) {
            sessionInfo.LastActivityTime = updateAttributes.lastActivityTime;
            console.log('lastActivityTime got updated in sessionInfo');
        }

        this.sessionInfoCache = sessionInfo;
        sessionStorage.setItem(SESSION_STORAGE_INFO, JSON.stringify(sessionInfo));
    }

    public removeSessionInfo(): void {
        sessionStorage.removeItem(SESSION_STORAGE_INFO);
    }

    public parseSessionInfo(sessionInfoString: string): KFSessionInfo {
        return KFSessionInfo.parseString(sessionInfoString);
    }

    public getSessionInfo(): KFSessionInfo {
        if (!this.sessionInfoCache) {
            const sessionInfoString = sessionStorage.getItem(SESSION_STORAGE_INFO);
            const sessionInfo = sessionInfoString ? this.parseSessionInfo(sessionInfoString) : null;
            this.sessionInfoCache = sessionInfo;
        }

        return this.sessionInfoCache;
    }

    public transferSessionInfoToLocalStorage(): void {
        const sessionInfo: KFSessionInfo = this.getSessionInfo();
        localStorage.setItem(TRANSITION_STORAGE_INFO, JSON.stringify(sessionInfo));
        setTimeout(() => {
            console.log('Timed destroy of the SessionInfo copied to local storage during Session Handoff');
            localStorage.removeItem(TRANSITION_STORAGE_INFO);
        }, 10000);

        console.log('Transferred SessionInfo to LocalStorage');
    }

    public transferSessionInfoFromLocalStorage(): void {
        const sessionInfoString = localStorage.getItem(TRANSITION_STORAGE_INFO);
        const sessionInfo = sessionInfoString ? this.parseSessionInfo(sessionInfoString): null;
        console.log('Transferred SessionInfo FROM LocalStorage', sessionInfo);
        this.sessionInfoCache = sessionInfo;
    }    

    public get AuthToken(): string {
        const sessionInfo: KFSessionInfo = this.getSessionInfo();
        return sessionInfo ? sessionInfo.User.AuthToken : null;
    }

    public get UserId(): number {
        const sessionInfo: KFSessionInfo = this.getSessionInfo();
        return sessionInfo ? sessionInfo.User.UserId : null;
    }

    public setRedirectUrl(redirectUrl: string): void {
        this.redirectUrl = redirectUrl;
    }

    public redirect(): void {
        if (!this.redirectUrl) {
            this.redirectUrl = '/';
        }

        this.router.navigate([this.redirectUrl]);
    }

    public authHttpCall<t>(method: string, url: string, data: any = null, headers: any = null, isReturnFullResponse: boolean = false): Observable<any> {
        let retVal: Observable<t> = null;
        headers = headers ? headers : {};
        if (!headers.authToken) {
            headers.authToken = this.AuthToken;
        }
        
        switch(method.toUpperCase()) {
            case 'GET':
                retVal = this.http.get<t>(url, { headers })
                    .map((response: any) => isReturnFullResponse ? response : (response && response.data ? response.data : null))
                    .catch((error: any) => Observable.throw(error));
                break;
            case 'PUT':
                break;
            case 'POST':
                break;
            case 'DELETE':
                break;
        }
        
        return retVal;
    };
}
