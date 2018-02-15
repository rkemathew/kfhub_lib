import { KFUser } from './kf.user.model';

export class KFSessionInfo {
    private user: KFUser;
    private authTokenRefreshTime: number;
    private loggedInTime: number;
    private lastActivityTime: number;

    constructor(user: KFUser, authTokenRefreshTime: Date, loggedInTime: Date, lastActivityTime: Date) {
        this.user = user;
        this.authTokenRefreshTime = authTokenRefreshTime ? authTokenRefreshTime.getTime() : null;
        this.loggedInTime = loggedInTime ? loggedInTime.getTime() : null;
        this.lastActivityTime = lastActivityTime ? lastActivityTime.getTime() : null;
    }

    public static parseString(sessionInfoString): KFSessionInfo {
        let sessionInfo: KFSessionInfo = new KFSessionInfo(null, null, null, null);

        try {
            let sessionInfoParsed: any = JSON.parse(sessionInfoString);
            sessionInfo.user = new KFUser(sessionInfoParsed.user);
            sessionInfo.authTokenRefreshTime = sessionInfoParsed.authTokenRefreshTime;
            sessionInfo.loggedInTime = sessionInfoParsed.loggedInTime;
            sessionInfo.lastActivityTime = sessionInfoParsed.lastActivityTime;
        } catch(e) {
        }

        return sessionInfo;
    }

    get User(): KFUser {
        return this.user;
    }

    set User(value: KFUser) {
        this.user = value;
    }

    get AuthTokenRefreshTime(): Date {
        return new Date(this.authTokenRefreshTime);
    }

    set AuthTokenRefreshTime(value: Date) {
        this.authTokenRefreshTime = value.getTime();
    }

    get LoggedInTime(): Date {
        return new Date(this.loggedInTime);
    }

    set LoggedInTime(value: Date) {
        this.loggedInTime = value.getTime();
    }

    get LastActivityTime(): Date {
        return new Date(this.lastActivityTime);
    }

    set LastActivityTime(value: Date) {
        this.lastActivityTime = value.getTime();
    }
}
