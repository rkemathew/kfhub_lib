import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'kf-header',
    templateUrl: './kf.header.component.html',
    styleUrls: ['./kf.header.component.less']
})
export class KFHeaderComponent {
    public  appUrlPrefix: string = environment().appUrlPrefix;
    public isShowMenu: boolean = false;

    @Input()
    isShowNav: boolean = false;

    @Output()
    onlogout: EventEmitter<null> = new EventEmitter<null>();

    constructor() {}

    toggleMenu(): void {
        this.isShowMenu = !this.isShowMenu;
    }

    preferences(): void {
        this.isShowMenu = false;
        // TODO:
    }
    
    logout(): void {
        this.isShowMenu = false;
        this.onlogout.emit();
    }

    hasAdminRole(): boolean {
        return true;
    }

    redirectToAdminModule(): void {
        this.isShowMenu = false;
        // TODO:
    }

    redirectToTalent() {
    }
}
