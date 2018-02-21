import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'kf-internal-app-router',
    templateUrl: './kf.internal-app-router.component.html',
    styleUrls: ['./kf.internal-app-router.component.less']
})
export class KFInternalAppRouterComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        let redirectPath = this.activatedRoute.snapshot.queryParams["redirectPath"];
        if (!redirectPath) {
            redirectPath="init";
        }
        console.log('************', redirectPath);
        this.router.navigate([ redirectPath ]);
    }
}
