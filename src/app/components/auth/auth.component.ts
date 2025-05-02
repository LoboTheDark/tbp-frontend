import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf etc.
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // <-- Import Router (For navigation after success)
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatCardModule, 
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // <-- Inject AuthService
    private router: Router // <-- Inject Router (optional)
  ) { // <-- FormBuilder Service injizieren
    // Formularstruktur in der Komponente definieren
    this.registrationForm = this.fb.group({
      username: ['', Validators.required], // FormControl für Username, mit 'required' Validator
      email: ['', [Validators.required, Validators.email]], // FormControl für Email, mit 'required' und 'email' Validatoren
      password: ['', [Validators.required, Validators.minLength(8)]] // FormControl für Password, mit 'required' und 'minlength' Validatoren
    });
  }

  // Methode, die beim Absenden des Formulars aufgerufen wird
  onSubmit() {
    // Überprüfen, ob das Formular gültig ist
    if (this.registrationForm.valid) {
      console.log('Registrierungsdaten:', this.registrationForm.value); // <-- Daten aus dem FormGroup holen

       this.authService.register(this.registrationForm.value).subscribe(
         response => {
           console.log('Successfully registered', response);
           this.router.navigate(['/home']);
         },
         error => {
           console.error('Error happend during registering', error);
           this.handleError(error);
           this.registrationForm.markAllAsTouched();
         }
       );

    } else {
      console.log('Formular ist ungültig');
       this.registrationForm.markAllAsTouched();
    }
  }

  private handleError(error: any) {
    if (error.status === 400 && error.error?.message) {
      this.errorMessage = error.error.message;
    } else if (error.status === 409) {
      this.errorMessage = 'Used username/email is already registered. Please login instead.';
    } else {
      this.errorMessage = 'An unknown error happended. ' + this.errorMessage;
    }
  }

}