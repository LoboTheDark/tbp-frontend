import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf etc.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ODER Import für Reactive Forms
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule
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
        console.log("Login successfull!");
        //this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Login failed. Please check your credentials!';
      }
    });
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
