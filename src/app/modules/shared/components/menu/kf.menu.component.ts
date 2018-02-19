import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { KFMenuItem } from '../../models/kf.menu-item.model';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
    selector: 'kf-menu',
    templateUrl: './kf.menu.component.html',
    styleUrls: ['./kf.menu.component.less']
})
export class KFMenuComponent implements OnInit {
    activeMenuItem: KFMenuItem = null;
    @Input() menuItems: KFMenuItem[] = null;

    constructor(
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.setActiveMenuItem(this.findActiveMenuItem());
        this.setActiveSubMenuItem(this.findActiveSubMenuItem());
    }

    setActiveMenuItem(menuItem: KFMenuItem) {
        this.activeMenuItem = menuItem;
        if (this.activeMenuItem && this.activeMenuItem.activeSubMenuItem == null) {
            this.setActiveSubMenuItem(this.activeMenuItem.subMenuItems[0]);
        }
    }

    setActiveSubMenuItem(menuItem: KFMenuItem) {
        if (this.activeMenuItem) {
            this.activeMenuItem.activeSubMenuItem = menuItem;
        }
    }

    findActiveMenuItem(): KFMenuItem {
        const locationPath = this.location.path().slice(1);
        const pos = locationPath.indexOf('/');
        const firstLevelRoutePath = locationPath.slice(0, pos);

        const index = this.menuItems.findIndex((menuItem: KFMenuItem) => {
            const miPos = menuItem.route.indexOf('/');
            const miFirstLevelRoutePath = menuItem.route.slice(0, miPos);
            return  miFirstLevelRoutePath === firstLevelRoutePath;
        });

        return (this.menuItems && this.menuItems[index]) ? this.menuItems[index]: null;
    }

    findActiveSubMenuItem(): KFMenuItem {
        const locationPath = this.location.path().slice(1);
        const pos = this.getPosition(locationPath, '/', 2);
        const secondLevelRoutePath = locationPath.slice(0, pos);

        let index = 0;
        if (this.activeMenuItem && this.activeMenuItem.subMenuItems) {
            index = this.activeMenuItem.subMenuItems.findIndex((menuItem: KFMenuItem) => {
                const miPos = this.getPosition(menuItem.route, '/', 2);
                const miSecondLevelRoutePath = menuItem.route.slice(0, miPos);
                return  miSecondLevelRoutePath === secondLevelRoutePath;
            });
        }
        
        return (this.activeMenuItem && this.activeMenuItem.subMenuItems && this.activeMenuItem.subMenuItems[index]) ?
            this.activeMenuItem.subMenuItems[index]: null;
    }

    onMenuActivate(menuItem: KFMenuItem) {
        this.setActiveMenuItem(menuItem);
        this.router.navigate([ menuItem.route ]);
    }

    onSubMenuActivate(menuItem: KFMenuItem) {
        this.setActiveSubMenuItem(menuItem);
        console.log('onSubMenuActivate menuItem.route', menuItem.route);
        this.router.navigate([ menuItem.route ]);
    }

    getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
}
