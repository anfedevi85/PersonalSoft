import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SuperadminGuard implements CanActivate {
  constructor(private userService : UserService,
    private router : Router){}

  canActivate(): boolean {
      if  (this.userService.rol === 'SuperAdmin') {
        return true;
      }else{
        this.router.navigateByUrl('dashboard');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Acceso restringido',
          showConfirmButton: false,
          timer: 2000
        });
        return false
      }

  }
}
