import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { AdvGrowlModule } from 'primeng-advanced-growl';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { KFHeaderComponent } from './components/header/kf.header.component';
import { KFFooterComponent } from './components/footer/kf.footer.component';
import { KFMenuComponent } from './components/menu/kf.menu.component';
import { KFLoginComponent } from './components/auth/kf.login.component';

import { KFAuthService } from './services/kf.auth.service';
import { KFSharedConstantsService } from './services/kf.shared-constants.service';
import { KFUtilsService } from './services/kf.utils.service';
import { KFRoutesService } from './services/kf.routes.service';

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
        KFHeaderComponent,
        KFFooterComponent,
        KFMenuComponent,
        KFLoginComponent
    ],
    exports: [
        KFHeaderComponent,
        KFFooterComponent,
        KFMenuComponent,
        KFLoginComponent
    ],
    entryComponents: [
        KFLoginComponent
    ],
    providers: [
        KFRoutesService,
        KFAuthService,
        KFSharedConstantsService,
        KFUtilsService
    ]
})
export class KFSharedModule { }
