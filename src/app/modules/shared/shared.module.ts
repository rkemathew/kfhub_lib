import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { AdvGrowlModule } from 'primeng-advanced-growl';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { KFLoginComponent } from './components/auth/kflogin.component';

import { AuthService } from './services/auth.service';
import { SharedConstantsService } from './services/shared-constants.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        AdvGrowlModule,
        ModalModule,
        BootstrapModalModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        KFLoginComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        KFLoginComponent
    ],
    providers: [
        AuthService,
        SharedConstantsService
    ]
})
export class SharedModule { }
