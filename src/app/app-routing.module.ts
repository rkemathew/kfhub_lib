import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './modules/shared/services/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/shared/components/auth/login.component';
import { SandboxMainComponent } from './modules/sanboxes/main/sanboxmain.component';

const routes: Routes = [
    { path: '', redirectTo: 'sandboxmain', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'sandboxmain', component: SandboxMainComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
