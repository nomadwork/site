import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { HomeRoutingModule } from './home.routing-module';
import { HomeNewComponent } from './home-new/home-new.component';

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
    imports: [
        CommonModule, HomeRoutingModule,    
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyADVjs3gx7EaQmkR9_sRhoKWPWaVOWHxus'
          }),
          AgmSnazzyInfoWindowModule
    ],
    declarations: [HomeComponent, HomeMapComponent, HomeNewComponent],
    providers: []
})
export class HomeModule { }
