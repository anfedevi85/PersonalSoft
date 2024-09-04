import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  passwordForm! : FormGroup

  token: string;
  id!: string ;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private alert: AlertsService
  ) {
    this.token = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.min(7)]],
      password2: ['', [Validators.required]]
    });
  }


  changePassword(){
    console.log(this.passwordForm.value);
    const password = this.passwordForm.value.password;
    const password2 = this.passwordForm.value.password2;
    console.log(this.token);
    if (password === password2) {
      this.userService.updatePassword(this.token, password || '')
      .subscribe(
       async resp =>{
          console.log(resp);
          // this.router.navigateByUrl('/login');
        await  this.alert.success('Pasword Update');
        },async (err)=>{
          console.log(err);
          await this.alert.error( err.error.msg)
        }
      );

    }else{
     this.alert.error('Please check Passworrds')
    }
  }
}
