import { KFMenuComponent } from "../components/menu/kf.menu.component";

export class KFMenuItem {
    name: string;
    route: string;
    subMenuItems: KFMenuItem[];
    activeSubMenuItem: KFMenuItem;

    constructor( name: string, route: string, subMenuItems: KFMenuItem[] = null, activeSubMenuItem: KFMenuItem = null) {
        this.name = name;
        this.route = route;
        this.subMenuItems = subMenuItems;
        this.activeSubMenuItem = activeSubMenuItem;
    }
}
