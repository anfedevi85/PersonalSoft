import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService : UserService,
    private router : Router){}

  canActivate(): boolean {
      if  (this.userService.rol === 'Administrator-Level 3' || this.userService.rol === 'SuperAdmin') {
        return true;
      }else{
        this.router.navigateByUrl('dashboard');
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Restricted access',
          showConfirmButton: false,
          timer: 2000
        });
        return false
      }

  }
}
