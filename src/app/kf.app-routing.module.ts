import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KFAuthGuardService as AuthGuard } from './modules/shared/services/kf.auth-guard.service';

import { KFLoginComponent } from './modules/shared/components/auth/kf.login.component';
import { KFSandboxMainComponent } from './modules/sanboxes/main/kf.sanboxmain.component';

const routes: Routes = [
    { path: '', redirectTo: 'sandboxmain', pathMatch: 'full' },
    { path: 'login', component: KFLoginComponent },
    { path: 'sandboxmain', component: KFSandboxMainComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class KFAppRoutingModule {}
