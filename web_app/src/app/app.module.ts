import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InputTextModule, ButtonModule, TabViewModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMainComponent } from './user-main/user-main.component';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    LoginComponent,
    UserSettingsComponent,
    UserMainComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    TabViewModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


