import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { GameRegisterComponent } from './components/game-register/game-register.component';

export const routes: Routes = [
    {
        path: 'auth',       // <-- Path to find the component (z.B. http://localhost:4200/auth)
        component: AuthComponent // <-- Matching component
    },
    {
        path: 'register',       // <-- Path to find the component (z.B. http://localhost:4200/auth)
        component: GameRegisterComponent // <-- Matching component
    },

];
