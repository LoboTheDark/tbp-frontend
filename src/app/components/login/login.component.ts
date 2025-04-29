import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf etc.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ODER Import für Reactive Forms
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
      }
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
