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

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Interceptor } from './auth/interceptor.module';
import { DialogEstablishmentsComponent } from './shared/dialog-establishments/dialog-establishments.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AppLayoutComponent,
    DialogEstablishmentsComponent
  ],
  imports: [
    SwiperModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
    SharedModule,
    Interceptor,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    LazyLoadImageModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  entryComponents: [DialogEstablishmentsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
