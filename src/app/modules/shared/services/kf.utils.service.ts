import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

const nonAppPages: Array<string> = [
    "/login"
];

@Injectable()
export class KFUtilsService {
    constructor(private location: Location) {}

    isAppPages(): boolean {
        return nonAppPages.indexOf(this.location.path()) === -1;
    }
}
