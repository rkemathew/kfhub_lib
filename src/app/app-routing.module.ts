import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './modules/shared/services/auth-guard.service';

import { AppComponent } from './app.component';
import { KFLoginComponent } from './modules/shared/components/auth/kflogin.component';
import { SandboxMainComponent } from './modules/sanboxes/main/sanboxmain.component';

const routes: Routes = [
    { path: '', redirectTo: 'sandboxmain', pathMatch: 'full' },
    { path: 'login', component: KFLoginComponent },
    { path: 'sandboxmain', component: SandboxMainComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
