import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFGradeLevelPieComponent } from '../components/kf-grade-level-pie/kf.grade-level-pie.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        KFGradeLevelPieComponent
    ],
    exports: [
        KFGradeLevelPieComponent
    ]
})
export class KFComponentsModule { }
