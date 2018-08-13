import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavComponent } from '../dashboard/nav/nav.component';
import { AdvertsComponent } from '../dashboard/adverts/adverts.component';
import { AdvertFormComponent } from '../dashboard/adverts/advert-form/advert-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AdvertsComponent
      },
      {
        path: 'adverts',
        component: AdvertsComponent,
        children: [
          {
            path: '',
            component: AdvertFormComponent
          },
          {
            path: 'list',
            component: AdvertFormComponent
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule ]
})
export class AppRoutingModule { }
