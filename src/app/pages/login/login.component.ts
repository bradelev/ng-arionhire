import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  private readonly _authState$ = this._authService.authState$;
}
