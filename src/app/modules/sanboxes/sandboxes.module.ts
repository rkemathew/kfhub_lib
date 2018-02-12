import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { SandboxMainComponent } from './main/sanboxmain.component';
import { KFGradeLevelPieComponent } from '../components/kfgradelevelpie/kfgradelevelpie.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SandboxMainComponent,
        KFGradeLevelPieComponent
    ],
    providers: []
})
export class SandboxModule { }
