import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';

export const childsGuard: CanActivateChildFn = (childRoute, state) => {

  const router =inject(Router);
  const userService =inject(UserService);
  const alertService =inject(AlertsService);

   return new Promise((resolve)  =>  {
    console.log('running Child guard!');
      userService.validarToken()
      .subscribe(
        res=>{
          console.log('ok')
          console.log(res)
          if (res) {
            resolve(true);
          }else{
            alertService.warning('The session has expired. Please login again')
            router.navigate(['/login']);
            console.log('no token');
            resolve(false);
          }
        }
      )
  });
};
