import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { GameRegisterComponent } from './components/game-register/game-register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',       // <-- Path to find the component (z.B. http://localhost:4200/register)
        component: AuthComponent // <-- Matching component
    },
    {
        path: 'home',       // <-- Path to find the component (z.B. http://localhost:4200/home)
        component: GameRegisterComponent, // <-- Matching component
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];
