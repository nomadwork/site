import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { HomeRoutingModule } from './home.routing-module';
import { HomeNewComponent } from './home-new/home-new.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RegisterPlaceComponent } from './home-map/register-place/register-place.component';
import { SharedModule } from '../shared.module';
import { DialogPlaceDetailComponent } from '../shared/dialog-place-detail/dialog-place-detail.component';


@NgModule({
    imports: [
        CommonModule, HomeRoutingModule,
        LeafletModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [HomeComponent, HomeMapComponent, HomeNewComponent, DialogPlaceDetailComponent, RegisterPlaceComponent],
    entryComponents: [RegisterPlaceComponent],
    providers: []
})
export class HomeModule { }
