import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NavbarComponent } from '@app/layouts/navbar/core/navbar.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import { IntroTourComponent } from './components/intro-tour/intro-tour.component';
import {AuthInterceptor} from "./authentication/interceptors/auth.interceptor";
import { ToastComponent } from '@app/layouts/toast/core/toast.component';
import { LogInComponent } from '@app/authentication/core/log-in/log-in.component';
import { RegisterComponent } from '@app/authentication/core/register/register.component';
import { HomeComponent } from '@app/components/home/home.component';
import {LanguageService} from "@app/base/services/language.service";
import {UserDashboardComponent} from "@app/components/dashboards/user-dashboard/user-dashboard.component";
import { VehicleListComponent } from '@app/components/vehicle/core/vehicle-list/vehicle-list.component';
import { BaseListComponent } from '@app/base/core/base-list/base-list.component';
import { BaseImageComponent } from '@app/base/core/base-image/base-image.component';
import { VehicleImageComponent } from '@app/components/vehicle/core/vehicle-image/vehicle-image.component';
import { BaseAddComponent } from '@app/base/core/base-add/base-add.component';
import { BaseDeleteComponent } from '@app/base/core/base-delete/base-delete.component';
import { BasePaginationComponent } from '@app/base/core/base-pagination/base-pagination.component';
import { BaseUpdateComponent } from '@app/base/core/base-update/base-update.component';
import { PersonListComponent } from '@app/components/person/core/person-list/person-list.component';
import { PieceListComponent } from '@app/components/piece/core/piece-list/piece-list.component';
import { PieceImageComponent } from '@app/components/piece/core/piece-image/piece-image.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IntroTourComponent,
    ToastComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    UserDashboardComponent,
    VehicleListComponent,
    BaseListComponent,
    BaseImageComponent,
    VehicleImageComponent,
    BaseAddComponent,
    BaseDeleteComponent,
    BasePaginationComponent,
    BaseUpdateComponent,
    PersonListComponent,
    PieceListComponent,
    PieceImageComponent,
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
    ReactiveFormsModule
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
export class AppModule {

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.checkProfile();
    this.languageService.applyDefault();
  }

  private checkProfile(){
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
