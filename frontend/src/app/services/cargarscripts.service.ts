import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarscriptsService {

  constructor() {
   }



 cargar(archivos: string[]){
    for (const archivo of archivos) {

      const script = document.createElement("script");
      script.src=`assets/${archivo}.js`;
      const body= document.getElementsByTagName('body')[0];
      body.appendChild(script);

    }
  }


  // plugins(archivos: string[]){
  //   for (const archivo of archivos) {

  //     const script = document.createElement("script");
  //     script.src=`../../assets/plugins/global/${archivo}.js`;
  //     const body= document.getElementsByTagName('body')[0];
  //     body.appendChild(script);

  //   }
  // }
}
