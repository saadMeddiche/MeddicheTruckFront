import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './authentication/components/signin/signin.component';
import { SignupComponent } from './authentication/components/signup/signup.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import {FormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NavbarComponent } from './layouts/navbar/component/navbar.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import { PopupComponent } from './components/popup/popup.component';
import { IntroTourComponent } from './components/intro-tour/intro-tour.component';
import { HomeComponent } from './components/home/home.component';
import { PieceComponent } from './components/piece/piece.component';
import { PieceListComponent } from './components/piece/components/piece-list/piece-list.component';
import { PieceAddComponent } from './components/piece/components/piece-add/piece-add.component';
import { PieceUpdateComponent } from './components/piece/components/piece-update/piece-update.component';
import {AuthInterceptor} from "./authentication/interceptors/auth.interceptor";
import { VehicleAddComponent } from './components/vehicle/components/vehicle-add/vehicle-add.component';
import { VehicleUpdateComponent } from './components/vehicle/components/vehicle-update/vehicle-update.component';
import { VehicleListComponent } from './components/vehicle/components/vehicle-list/vehicle-list.component';
import { PersonComponent } from './components/person/person.component';
import { PersonListComponent } from './components/person/components/person-list/person-list.component';
import { PersonAddComponent } from './components/person/components/person-add/person-add.component';
import { PersonUpdateComponent } from './components/person/components/person-update/person-update.component';
import {VehicleComponent} from "./components/vehicle/vehicle.component";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    NavbarComponent,
    PopupComponent,
    IntroTourComponent,
    HomeComponent,
    PieceComponent,
    PieceListComponent,
    PieceAddComponent,
    PieceUpdateComponent,
    VehicleComponent,
    VehicleAddComponent,
    VehicleUpdateComponent,
    VehicleListComponent,
    PersonComponent,
    PersonListComponent,
    PersonAddComponent,
    PersonUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatToolbar,
    MatIcon,
    NgOptimizedImage,
    MatCardActions,
    MatCardImage,
    MatIconButton,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
