import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../guards/auth.guard';
import { NewcompanyComponent } from './company/newcompany/newcompany.component';
import { NewuserComponent } from './usuarios/newuser/newuser.component';
import { EditcompanyComponent } from './company/editcompany/editcompany.component';
import { CargarscriptsService } from 'src/app/services/cargarscripts.service';
import { EdituserComponent } from './usuarios/edituser/edituser.component';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { FileUploadService } from '../services/file-upload.service';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { EditperfilComponent } from './usuarios/editperfil/editperfil.component';
import { ViewcompaniesComponent } from './company/viewcompanies/viewcompanies.component';
import { ProfilecompanyComponent } from './company/profilecompany/profilecompany.component';
import { ViewusersComponent } from './usuarios/viewusers/viewusers.component';
import { ViewemployeeComponent } from './usuarios/employees/viewemployee/viewemployee.component';
import { NewemployeeComponent } from './usuarios/employees/newemployee/newemployee.component';

import { PhoneformatDirective } from '../directives/phoneformat.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AutofilladdressDirective } from '../directives/autofilladdress.directive';
import { EmployeecertificatesComponent } from './usuarios/employees/employeecertificates/employeecertificates.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { CurrencyFormatDirective } from '../directives/currency-format.directive';
import { PorcentageformatDirective } from '../directives/porcentageformat.directive';
import { CamelcaseDirective } from '../directives/camelcase.directive';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SsnformatDirective } from '../directives/ssnformat.directive';
import { AdminGuard } from '../guards/admin.guard';
import { SuperadminGuard } from '../guards/superadmin.guard';
import { ProfileComponent } from './usuarios/employees/profile/profile.component';
import { VerificationcodeComponent } from './usuarios/employees/verificationcode/verificationcode.component';
import { OtpDirective } from '../directives/otp.directive';
import { SignaturepadComponent } from './signaturepad/signaturepad.component';
import { ShowDashDirective } from '../directives/show-dash.directive';
import { NewproductoComponent } from './productos/newproducto/newproducto.component';
import { EditproductoComponent } from './productos/editproducto/editproducto.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    NewcompanyComponent,
    NewuserComponent,
    EditcompanyComponent,
    EdituserComponent,
    PerfilComponent,
    EditperfilComponent,
    ViewcompaniesComponent,
    ProfilecompanyComponent,
    ViewusersComponent,
    ViewemployeeComponent,
    NewemployeeComponent,

    PhoneformatDirective,
    AutofilladdressDirective,
    EmployeecertificatesComponent,
    AdminmenuComponent,
    CurrencyFormatDirective,
    PorcentageformatDirective,
    CamelcaseDirective,
    DropzoneComponent,
    SsnformatDirective,
    ProfileComponent,
    VerificationcodeComponent,
    OtpDirective,
    SignaturepadComponent,
    ShowDashDirective,
    NewproductoComponent,
    EditproductoComponent

  ],
  imports: [
    BrowserModule,
    DataTablesModule.forRoot(),
    SharedModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot()


  ],
  exports:[
    PagesComponent,
    PhoneformatDirective,
    AutofilladdressDirective,
    PerfilComponent
  ],
  providers:[
    AdminGuard,
    SuperadminGuard,
    CargarscriptsService,
    UserService,
    CompanyService,
    FileUploadService,
    AuthGuard

  ],
  bootstrap: [PagesComponent]
})
export class PagesModule { }
