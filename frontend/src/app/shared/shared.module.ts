import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AuthGuard } from '../guards/auth.guard';

import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

import { CargarscriptsService } from '../services/cargarscripts.service';


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers:[
    AuthGuard,
    CargarscriptsService,
  ]
})
export class SharedModule { }
