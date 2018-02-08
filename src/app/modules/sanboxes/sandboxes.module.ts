import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { SandboxMainComponent } from './main/sanboxmain.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        SandboxMainComponent
    ],
    exports: [
        SandboxMainComponent
    ],
    providers: []
})
export class SandboxModule { }
