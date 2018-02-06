import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    public isShowMenu: boolean = false;

    @Input()
    isShowNav: boolean = false;

    @Output()
    onlogout: EventEmitter<null> = new EventEmitter<null>();

    constructor() {};

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
