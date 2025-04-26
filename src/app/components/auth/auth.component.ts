// Beispiel für src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Für *ngIf etc.
//import { FormsModule } from '@angular/forms'; // Import für Template-Driven Forms
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ODER Import für Reactive Forms
import { AuthService } from '../../services/auth.service'; // <-- Import AuthService
import { Router } from '@angular/router'; // <-- Import Router (optional, for navigation after success)

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  registrationForm: FormGroup;

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

      // TODO: Später hier die Daten an den AuthService senden
       this.authService.register(this.registrationForm.value).subscribe(
         response => {
           console.log('Registrierung erfolgreich', response);
           // Weiterleitung oder Erfolgsmeldung
         },
         error => {
           console.error('Registrierung fehlgeschlagen', error);
           // Fehlermeldung anzeigen
         }
       );

    } else {
      console.log('Formular ist ungültig');
      // Optional: Feedback an den Benutzer geben
       this.registrationForm.markAllAsTouched(); // Alle Felder als berührt markieren, um Validierungsfehler anzuzeigen
    }
  }

}