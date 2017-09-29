import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {ButtonModule, TabViewModule, AutoCompleteModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMainComponent } from './user-main/user-main.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatTabsModule, MatSelectModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    LoginComponent,
    UserSettingsComponent,
    UserMainComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AutoCompleteModule,
    FormsModule,
    MatTabsModule,
    MatSelectModule,
    TabViewModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


