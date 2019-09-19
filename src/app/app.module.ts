import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppLayoutComponent } from './app-layout.component';
import { SharedModule } from './shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-alerts';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    LazyLoadImageModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
