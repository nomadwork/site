import { Component } from '@angular/core';

@Component({
  selector: 'app-app-main',
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
      `,
})
export class AppLayoutComponent {
}
