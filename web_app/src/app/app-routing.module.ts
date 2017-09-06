import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'homePage',
    component: UserHomeComponent
  },
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const appRouterModule = RouterModule.forRoot(routes);
