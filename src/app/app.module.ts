import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './authentication/components/signin/signin.component';
import { SignupComponent } from './authentication/components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
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
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
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
    PieceUpdateComponent
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
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
