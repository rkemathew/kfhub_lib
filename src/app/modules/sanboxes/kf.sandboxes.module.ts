import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { KFSandboxMainComponent } from './main/kf.sanboxmain.component';
import { KFComponentsModule } from '../components/kfcomponents.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        KFComponentsModule
    ],
    declarations: [
        KFSandboxMainComponent
    ],
    providers: []
})
export class KFSandboxModule { }
