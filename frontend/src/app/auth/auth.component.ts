import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AuthModule } from './auth.module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  {

  @ViewChild ('register') register!: RegisterComponent;

  today: Date = new Date();



  constructor(private router: Router) {

   }

  ngOnInit(): void {
    console.log(this.router.url);


  }




}
