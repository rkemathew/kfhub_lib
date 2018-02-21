import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';

const nonAppPages: Array<string> = [
    "/login"
];

@Injectable()
export class KFUtilsService {
    constructor(private location: Location) {}

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }

    getUrlPrefixedPath(path: string): string {
        let appUrlPrefix: string = environment().appUrlPrefix;
        if (appUrlPrefix.startsWith('/')) {
            appUrlPrefix = appUrlPrefix.slice(1);
        }
        return appUrlPrefix + '/' + path;
    }
}
