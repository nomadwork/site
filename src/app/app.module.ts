import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppLayoutComponent } from './app-layout.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADVjs3gx7EaQmkR9_sRhoKWPWaVOWHxus'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
