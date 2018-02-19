import { Component, Input } from '@angular/core';

@Component({
    selector: 'kf-grade-level-pie',
    templateUrl: './kf.grade-level-pie.component.html',
    styleUrls: [ './kf.grade-level-pie.component.less' ]
})
export class KFGradeLevelPieComponent {
    @Input() public grade: number = 0;
    @Input() public label: string = "Grade";
}
