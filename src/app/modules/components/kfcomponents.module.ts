import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KFGradeLevelPieComponent } from '../components/kfgradelevelpie/kfgradelevelpie.component';

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
