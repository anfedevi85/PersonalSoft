import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from '../page404/page404.component';
import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { NgxDropzoneModule, } from 'ngx-dropzone';
import { DropzoneComponent } from '../pages/dropzone/dropzone.component';
import { PhoneformatDirective } from '../directives/phoneformat.directive';
import { PagesModule } from '../pages/pages.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    Page404Component,
    ForgotComponent,
    NewpasswordComponent,
    OtpverificationComponent,
    LandingComponent,
    RegisterComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxDropzoneModule
  ]
})
export class AuthModule { }
