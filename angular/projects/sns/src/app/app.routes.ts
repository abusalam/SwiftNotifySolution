import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './auth/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './auth/reset-password-page/reset-password-page.component';

export const routes: Routes = [
    {
        path:'',
        component:LandingPageComponent,
        title:'Home Page'
    },
    {
        path:'register',
        component:RegisterPageComponent,
        title:'Register'
    },
    {
        path:'login',
        component:LoginPageComponent,
        title:'Login'
    },
    {
        path:'forgot',
        component:ForgotPasswordPageComponent,
        title:'Forgot Password'
    },
    {
        path:'reset',
        component:ResetPasswordPageComponent,
        title:'Reset Password'
    },
    {
        path:'**',
        component:ErrorPageComponent,
        title:'Page not found'
    }
];
