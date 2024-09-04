import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NewcompanyComponent } from './company/newcompany/newcompany.component';
import { NewuserComponent } from './usuarios/newuser/newuser.component';
import { EditcompanyComponent } from './company/editcompany/editcompany.component';
import { EdituserComponent } from './usuarios/edituser/edituser.component';
import { AdminGuard } from '../guards/admin.guard';
import { SuperadminGuard } from '../guards/superadmin.guard';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { EditperfilComponent } from './usuarios/editperfil/editperfil.component';
import { ViewcompaniesComponent } from './company/viewcompanies/viewcompanies.component';
import { ProfilecompanyComponent } from './company/profilecompany/profilecompany.component';
import { ViewusersComponent } from './usuarios/viewusers/viewusers.component';
import { ViewemployeeComponent } from './usuarios/employees/viewemployee/viewemployee.component';
import { NewemployeeComponent } from './usuarios/employees/newemployee/newemployee.component';

import { EmployeecertificatesComponent } from './usuarios/employees/employeecertificates/employeecertificates.component';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { audit } from 'rxjs';

import { childsGuard } from '../guards/childs.guard';
import { ProfileComponent } from './usuarios/employees/profile/profile.component';
import { VerificationcodeComponent } from './usuarios/employees/verificationcode/verificationcode.component';
import { NewproductoComponent } from './productos/newproducto/newproducto.component';
import { EditproductoComponent } from './productos/editproducto/editproducto.component';

const routes: Routes=[
  {path:'',
  component:PagesComponent,
  //  canActivate: [AuthGuard],
// canActivateChild: [childsGuard],
  children:[
    {path: '', redirectTo: 'dashboard',pathMatch: 'full' },
    {path: 'admin' ,  component: AdminmenuComponent, title: 'Administration'},
    {path: 'dashboard',canActivate: [AuthGuard],    component: DashboardComponent, title: 'Dashboard'},
    {path: 'users/perfil',   component: PerfilComponent,title: 'Profile'},
    // {path: 'jobfile/notes/:id',   component:NotesComponent ,title: 'Notes'},
    {path: 'admin/company/new',   component: NewcompanyComponent, title: 'New Company'},
    {path: 'admin/company/view',    component: ViewcompaniesComponent, title: 'Companies'},
    {path: 'admin/company/edit/:id',   component: EditcompanyComponent,title: 'Edit Company '},
    {path: 'admin/company/profile/:id',    component: ProfilecompanyComponent,title: 'Profile Company '},
    {path: 'admin/users/view',   component: ViewusersComponent,title: 'Users'},
    {path: 'admin/users/new',   component: NewuserComponent,title: 'Add Users'},
    {path: 'admin/users/edit/:id',   component: EdituserComponent,title: 'Edit Users'},
    {path: 'admin/employees/verificationcode/:id/:token',   component: VerificationcodeComponent,title: 'Employee SMS'},
    {path: 'admin/employees/view',   component: ViewemployeeComponent,title: 'Employee'},
    {path: 'admin/employees/new', canActivate: [AuthGuard], component: NewemployeeComponent,title: 'New Employee'},

    {path: 'admin/employees/certificates/:id',   component: EmployeecertificatesComponent,title: 'Certificates Employee'},
    {path: 'admin/employees/profile',   component: ProfileComponent,title: 'Certificates Employee'},
    {path: 'admin/users/editperfil/:id',   component: EditperfilComponent,title: 'Edit Profile'},
    {path: 'dropzone',   component:DropzoneComponent ,title: 'dropzone'},
    {path: 'productos/new', component: NewproductoComponent,title: 'AppsGro - Nuevo Producto'},
    {path: 'productos/edit/:id', component: EditproductoComponent,title: 'AppsGro - Editar Producto'},
  ]

  }

      ]




@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PagesRoutingModule { }
