import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavigationService } from './services/navigation.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptors';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './dashboard/nav/nav.component';
import { AdvertsComponent } from './dashboard/adverts/adverts.component';
import { AdvertFormComponent } from './dashboard/adverts/advert-form/advert-form.component';
import { AdvertsListComponent } from './dashboard/adverts/adverts-list/adverts-list.component';
import { PlaylistComponent } from './dashboard/playlist/playlist.component';
import { PlaylistListComponent } from './dashboard/playlist/playlist-list/playlist-list.component';
import { UtilsService } from './services/utils.service';
import { PlaylistAddComponent, PlaylistAddModalComponent } from './dashboard/playlist/playlist-add/playlist-add.component';
import { DatePipe } from '@angular/common';
import {NgTempusdominusBootstrapModule} from 'ngx-tempusdominus-bootstrap';
import { PlaylistDetailComponent } from './dashboard/playlist/playlist-detail/playlist-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavComponent,
    AdvertsComponent,
    AdvertFormComponent,
    AdvertsListComponent,
    PlaylistComponent,
    PlaylistListComponent,
    PlaylistAddComponent,
    PlaylistAddModalComponent,
    PlaylistDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgTempusdominusBootstrapModule,
  ],
  providers: [
    NavigationService,
    AuthService,
    UtilsService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DATA, useValue: { hasBackdrop: false }
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }
    }
  ],
  entryComponents: [
    PlaylistAddModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
