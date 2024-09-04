import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { Page404Component } from './page404/page404.component';
import { childsGuard } from './guards/childs.guard';

const routes: Routes=[
  // {path: '', redirectTo: 'login',pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [childsGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },

  { path: '**', component: Page404Component },

  // {path: '', redirectTo: '/login', pathMatch:'full'},
  // {path: '**', component: PageNotFoundComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ useHash: true}),
    PagesRoutingModule,
    AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
