import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'landing',pathMatch: 'full',},
      {path: 'landing', component: LandingComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'newpassword/:id', component: NewpasswordComponent},
      {path: 'otpverification/:id', component: OtpverificationComponent}
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
