import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { HomeNewComponent } from './home-new/home-new.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: HomeMapComponent,
            },
            {
                path: 'new',
                component: HomeNewComponent
            },
            { path: '**', redirectTo: '' }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
