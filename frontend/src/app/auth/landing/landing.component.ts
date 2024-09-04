import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CargarscriptsService } from 'src/app/services/cargarscripts.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {


  constructor(private router: Router) {
    }

  ngOnInit(): void {


  }
}
