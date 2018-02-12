import { Component, Input } from '@angular/core';

@Component({
    selector: 'kf-grade-level-pie',
    templateUrl: './kfgradelevelpie.component.html',
    styleUrls: ['./kfgradelevelpie.component.less']
})
export class KFGradeLevelPieComponent {
    @Input() private grade: number = 0;
    @Input() private label: string = "Grade";
}
