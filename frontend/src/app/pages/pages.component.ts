import { Component, OnInit } from '@angular/core';
import { CargarscriptsService } from '../services/cargarscripts.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    private scripts: CargarscriptsService
  ) {
    // this.scripts.plugins(['plugins.bundle'])
  }

  ngOnInit(): void {


    this.scripts.cargar([
        'plugins/custom/datatables/datatables.bundle',
        'js/widgets.bundle',
        'js/custom/widgets',
        'js/custom/utilities/modals/users-search',
        'plugins/custom/fslightbox/fslightbox.bundle'
      ])
  }
}
