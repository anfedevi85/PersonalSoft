import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AlertsService } from '../services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  intervalID: any
  horaActual!: number;
  horaLogOut!: number;
  constructor(
    private userService: UserService,
    private router: Router,
    private alert : AlertsService)
    {
      this.horaActual= new Date().getTime();
      console.log(this.horaActual);
    }



        canActivate(): Promise<boolean> {


          return new Promise((resolve) => {
              this.userService.validarToken()
              .subscribe(
                async (res:any)=>{
                console.log(res);
                if (res) {
                  resolve(true);
                   this.horaLogOut= (new Date().getTime()+3600000);
                   console.log('______________________horaLogOut__________________');
                   console.log(this.horaLogOut);
                   console.log('______________________horaLogOut__________________');

                  this.verificarHora();
                  // setInterval(this.verificarHora, 10000);
                  // setTimeout(async ()=> {
                  //   await this.alert.timerPro('YOUR SESSION IS ABOUT TO TIME OUT!', 10);
                  // },10000);

                }else{
                  await this.alert.warning('The session has expired. Please login again.');

                  this.router.navigate(['/login']);
                  console.log('no token');
                  resolve(false);
                }
                }, async (err:any)=>{
                await this.alert.error(err.error.errors)
                }

              )
          });
        }

        async verificarHora(){
          clearInterval(this.intervalID)

         this.intervalID= setInterval( ()=> {
            console.log(new Date().getTime());
            console.log(this.horaLogOut);

            if (new Date().getTime()>= this.horaLogOut) {
             this.alert.timerPro('YOUR SESSION IS ABOUT TO TIME OUT!', 60)
              clearInterval(this.intervalID)
          }else{
            console.log('token ok hora');
          }

                  },10000);


        }



      }
