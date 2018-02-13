import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { SandboxMainComponent } from './main/sanboxmain.component';
import { KFComponentsModule } from '../components/kfcomponents.module';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        KFComponentsModule
    ],
    declarations: [
        SandboxMainComponent
    ],
    providers: []
})
export class SandboxModule { }
