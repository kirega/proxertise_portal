import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { SignupComponent } from '../signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavComponent } from '../dashboard/nav/nav.component';
import { AdvertsComponent } from '../dashboard/adverts/adverts.component';
import { AdvertFormComponent } from '../dashboard/adverts/advert-form/advert-form.component';
import { AdvertsListComponent } from '../dashboard/adverts/adverts-list/adverts-list.component';
import { PlaylistComponent } from '../dashboard/playlist/playlist.component';
import { PlaylistListComponent } from '../dashboard/playlist/playlist-list/playlist-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: AdvertsComponent,
        children: [
          {
            path: '',
            component: AdvertsListComponent
          },
        ]
      },

      {
        path: 'adverts',
        component: AdvertsComponent,
        children: [
          {
            path: '',
            component: AdvertsListComponent
          },
          {
            path: 'add',
            component: AdvertFormComponent
          },
        ]
      },

      {
        path: 'playlists',
        component: PlaylistComponent,
        children: [
          {
            path: '',
            component: PlaylistListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
