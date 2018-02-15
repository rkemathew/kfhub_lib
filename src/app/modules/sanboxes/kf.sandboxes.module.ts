import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { KFSandboxMainComponent } from './main/kf.sandbox-main.component';
import { KFComponentsModule } from '../components/kf.components.module';

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
