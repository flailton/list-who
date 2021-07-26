import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';

import { AccountService } from './services/account.service';
import { ContactService } from './services/contact.service';
import { LoginComponent } from './views/account/login/login.component';
import { LogoutComponent } from './views/account/logout/logout.component';
import { ContactComponent } from './views/contact/contact.component';
import { NavigationModule } from './views/navigation/navigation.module';
import { ContactShowComponent } from './views/contact/contact-show/contact-show.component';
import { ContactEditComponent } from './views/contact/contact-edit/contact-edit.component';
import { PhoneTypeService } from './services/phoneType.service';
import { LinkTypeService } from './services/linkType.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    ContactComponent,
    AppComponent,
    ContactShowComponent,
    ContactEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AccountService,
    ContactService,
    PhoneTypeService,
    LinkTypeService,
    {provide: APP_BASE_HREF, useValue: '/'},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
