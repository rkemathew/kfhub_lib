import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
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
        private router: Router
    ) {}

    ngOnInit() {
        this.setActiveMenuItem(this.menuItems ? this.menuItems[0]: null);
        this.setActiveSubMenuItem(this.activeMenuItem && this.activeMenuItem.subMenuItems ? this.activeMenuItem.subMenuItems[0]: null);
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

    onMenuActivate(menuItem: KFMenuItem) {
        this.setActiveMenuItem(menuItem);
        this.router.navigate([ menuItem.route ]);
    }

    onSubMenuActivate(menuItem: KFMenuItem) {
        this.setActiveSubMenuItem(menuItem);
        console.log('onSubMenuActivate menuItem.route', menuItem.route);
        this.router.navigate([ menuItem.route ]);
    }
}
