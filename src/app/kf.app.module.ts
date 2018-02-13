import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';

import { AdvGrowlModule } from 'primeng-advanced-growl';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { KFAppRoutingModule } from './kf.app-routing.module';
import { KFSharedModule } from './modules/shared/kf.shared.module';
import { KFSandboxModule } from './modules/sanboxes/kf.sandboxes.module';

import { KFAppComponent } from './kf.app.component';

import { MessageService } from 'primeng/components/common/messageservice';

import { KFSharedConstantsService } from './modules/shared/services/kf.shared-constants.service';
import { KFAuthGuardService } from './modules/shared/services/kf.auth-guard.service';
import { KFAuthService } from './modules/shared/services/kf.auth.service';
import { KFUtilsService } from './modules/shared/services/kf.utils.service';
import { KFPopupService } from './modules/shared/services/kf.popup.service';
import { KFComponentsModule } from './modules/components/kfcomponents.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./languages/", ".json");
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        NgHttpLoaderModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ModalModule.forRoot(),
        BootstrapModalModule,
        AdvGrowlModule,
        KFAppRoutingModule,
        KFComponentsModule,
        KFSharedModule,
        KFSandboxModule
    ],
    declarations: [
        KFAppComponent,
    ],
    providers: [
        TranslateService,
        MessageService,
        KFAuthGuardService,
        KFPopupService,
        KFUtilsService
    ],
    bootstrap: [KFAppComponent]
})
export class KFAppModule {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'de', 'es-ar', 'ja', 'pl', 'tr', 'zh']);
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
