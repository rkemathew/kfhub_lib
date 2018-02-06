import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';

import { AuthService } from './services/auth.service';
import { SharedConstantsService } from './services/shared-constants.service';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        MenuComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MenuComponent
    ],
    providers: [
        AuthService,
        SharedConstantsService
    ]
})
export class SharedModule { }
