import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { CargarscriptsService } from './services/cargarscripts.service';
import { OtpDirective } from './directives/otp.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ShowDashDirective } from './directives/show-dash.directive';


const routes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    AuthModule,
    PagesModule,
    // RouterModule.forRoot(routes, { useHash: true }),
    RouterModule,
    AuthRoutingModule,
    NgxDropzoneModule
  ],
  providers: [
    UserService,
    AuthGuard,
    CargarscriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
