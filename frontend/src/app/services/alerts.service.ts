import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private userService: UserService
  ) { }


async  success( title: any){

  await Swal.fire({
               position: 'center',
               icon: 'success',
               title: title,
               showConfirmButton: false,
               timer: 1500
    });
  }


  async  warning( title: any){

    await Swal.fire({
                 position: 'center',
                 icon: 'warning',
                 title: title,
                 showConfirmButton: false,
                 timer: 1500
      });
    }


async  error( text: any){

  await   Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Error',
              text: text,
              showConfirmButton: true
              // timer: 2000
      });

}


async timer(text: any, tiempo:number){

  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: text,
    text: `Estimated time remaining:: ${tiempo} seconds`,
    timer: tiempo * 1000, // Tiempo en milisegundos
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'EXTEND SESSION',
    cancelButtonText: 'LOG OUT',
    willOpen: () => {
      Swal.showLoading();
    }
  }).then((result) => {
    // Si el usuario cierra la alerta antes de que el tiempo termine
    if (result.dismiss === Swal.DismissReason.timer) {
      // clearInterval(timerInterval);
      this.userService.logout();
    }
  });

}

async timerPro(text: any, tiempo: any){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-light"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: text,
    text: `Estimated time remaining: ${tiempo} seconds`,
    icon: "warning",
    timer: tiempo * 1000, // Tiempo en milisegundos
    timerProgressBar: true,
    showCancelButton: true,
    confirmButtonText: "EXTEND SESSION",
    cancelButtonText: "LOG OUT",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
      // swalWi thBootstrapButtons.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success"
      // });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.userService.logout();
      swalWithBootstrapButtons.fire({
        title: "Log Out",
        text: "Time Out",
        icon: "info"
      });
    }else if (result.dismiss === Swal.DismissReason.timer) {
      // La alerta se cerró
      this.userService.logout();
      console.log('La alerta se cerró');
      // Aquí puedes ejecutar la acción que desees
    }
  });
}


}
