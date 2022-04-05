import {NgModule, Sanitizer} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from "@angular/material/toolbar";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {AuthenticationInterceptor} from "./_helpers/authentication.interceptor";
import {ResumesModule} from "./resumes/resumes.module";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatSnackBarModule,
        HttpClientModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        ResumesModule,


    ],
  providers: [
    {
      provide: 'apiUrl',
      useValue: "http://localhost:8085"
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
