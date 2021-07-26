import { NgModule } from "@angular/core";
import { AuthGuard } from './services/auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./views/account/login/login.component";
import { LogoutComponent } from './views/account/logout/logout.component';
import { ContactComponent } from "./views/contact/contact.component";
import { NotFoundComponent } from "./views/navigation/not-found/not-found.component";
import { ContactShowComponent } from "./views/contact/contact-show/contact-show.component";
import { ContactEditComponent } from "./views/contact/contact-edit/contact-edit.component";

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
    { path: 'contatos', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'contatos/visualizar/:id', component: ContactShowComponent, canActivate: [AuthGuard] },
    { path: 'contatos/editar/:id', component: ContactEditComponent, canActivate: [AuthGuard] },
    { path: 'contatos/cadastrar', component: ContactEditComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(rootRouterConfig, { enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }