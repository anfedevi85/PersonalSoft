import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  public forgotForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private alert : AlertsService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgot(){

    const email = this.forgotForm.value.email
    this.userService.forgot(email || '')
    .subscribe(
     async resp =>{
      console.log(resp);
      await this.alert.success('We have sent a link to your email please click to reset your password')
          this.router.navigateByUrl('login');
      },async (err)=>{
        await this.alert.error(err.error.errors)
      });

  }
}
