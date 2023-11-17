import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToolbarComponent],
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'ng-arionhire';
}
