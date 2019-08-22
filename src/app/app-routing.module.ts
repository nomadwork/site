import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuardService],
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
