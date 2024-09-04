import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private fb =inject(FormBuilder);
  private userService =inject(UserService);
  private router =inject(Router);
  private alert =inject(AlertsService);

  loginForm! : FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', Validators.compose([ Validators.required, Validators.email,Validators.minLength(3), Validators.maxLength(320),]),],
      password: ['', Validators.compose([ Validators.required,Validators.minLength(7)])],
      remenber:[false]
    }) ;
  }


  login(){

    this.userService.login( this.loginForm.value)
    .subscribe(
    async  res => {
      console.log(res);
        if (this.loginForm.value.remenber=== true) {
          localStorage.setItem('email', this.loginForm.value.email);
        }else{
          localStorage.removeItem('email');
        }
        await this.alert.success('Loading User')

        if (res.userDB.verificationCode) {
          this.router.navigate(['admin']);

        }else{
          this.router.navigate(['admin','employees','verificationcode', res.userDB._id, res.token]);
        }
      }, async(err)=>{
        await this.alert.error(err.error.msg );
      });
  }
}
