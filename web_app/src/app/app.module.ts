import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InputTextModule, ButtonModule} from 'primeng/primeng';
import { ActivatedRoute, Router} from '@angular/router';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AppRoutingModule, appRouterModule } from "./app-routing.module";

import { UserHomeComponent } from './user-home/user-home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    appRouterModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


