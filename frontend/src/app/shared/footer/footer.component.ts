import { Component } from '@angular/core';

import { CargarscriptsService } from 'src/app/services/cargarscripts.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  year : number;
  constructor(
    private scripts: CargarscriptsService,
  ) {

    this.year = new Date().getFullYear();
   }

  // ngOnInit(): void {
  //   this.scripts.cargar(['scripts.bundle','widgets.bundle']);
  // }

}
