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

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { SandboxModule } from './modules/sanboxes/sandboxes.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/shared/components/auth/login.component';

import { MessageService } from 'primeng/components/common/messageservice';

import { SharedConstantsService } from './modules/shared/services/shared-constants.service';
import { AuthGuardService } from './modules/shared/services/auth-guard.service';
import { AuthService } from './modules/shared/services/auth.service';
import { UtilsService } from './modules/shared/services/utils.service';
import { PopupService } from './modules/shared/services/popup.service';
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
        AppRoutingModule,
        KFComponentsModule,
        SharedModule,
        SandboxModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        TranslateService,
        MessageService,
        AuthGuardService,
        PopupService,
        UtilsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'de', 'es-ar', 'ja', 'pl', 'tr', 'zh']);
        translate.setDefaultLang('en');
        translate.use('en');
    }
}
