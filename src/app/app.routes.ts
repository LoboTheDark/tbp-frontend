import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { AuthGuard } from './auth/auth.guard';
import { environment } from '../environments/environment';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'register',       // <-- Path to find the component (z.B. http://localhost:4200/register)
        component: AuthComponent // <-- Matching component
    },
    {
        path: 'home/:steamId',       // <-- Path to find the component (z.B. http://localhost:4200/home/{steamId})
        component: HomeScreenComponent, // <-- Matching component
        canActivate: environment.production ? [AuthGuard] : []
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
