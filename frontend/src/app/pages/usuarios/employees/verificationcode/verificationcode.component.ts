import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})


export class VerificationcodeComponent implements  OnInit {
@ViewChild ('miBoton') miBoton!: ElementRef;

  verifyForm!: FormGroup;
  userID: string;
  user!: User;
  OTP: string;
  token!: string;
  ultimos4!: string;
  fechaOTP!: any;
  fechaVerificacion!: any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertsService
  ) {
    this.userID= this.activatedRoute.snapshot.paramMap.get('id')|| '';
    this.token= this.activatedRoute.snapshot.paramMap.get('token')|| '';
    this.OTP='';
  }

ngOnInit(): void {
  this.initForm();

  this.userService.getUserOTP(this.userID)
  .subscribe(
    (res:any)=>{
      this.user= res.user;
      this.ultimos4 = res.user.phone.slice(-4);
      this.fechaOTP=new Date();
      this.OTP=res.OTP;
      }, (err:any)=>{
      console.log(err)
      }
    )
}

initForm(){
  this.verifyForm = this.fb.group({
    verify: ['', Validators.compose([ Validators.required,Validators.minLength(6), Validators.maxLength(6),]),],

  }) ;
}


async verify(){
  this.fechaVerificacion= new Date();
  const diferencia = Math.floor((this.fechaVerificacion - this.fechaOTP)/(1000*60));
  console.log(diferencia);
  if (diferencia> 5) {
    this.alert.error('OTP expires')
  }else{
    console.log(this.verifyForm.value.verify);
  if (this.verifyForm.value.verify === this.OTP) {

    localStorage.setItem('userID', this.userID);
    localStorage.setItem('companyID', this.user.company._id||'');
    localStorage.setItem('rol', this.user.rol);


    await this.alert.success('Verification code entered successfully!');
    this.userService.updateVerificationCode(this.userID)
    .subscribe(
      (res:any)=>{
      console.log(res);
      this.router.navigate(['/admin'] );
      if (!res.user.newPassword) {
        this.miBoton.nativeElement.click();
      }
      }, (err:any)=>{
      console.log(err)

      }
    )
  }else{
    this.alert.error('Provided verification code invalid')
  }
  }




}

noCode(){

  this.alert.success('A new 6-digits verification code has been sent successfully!')
  this.ngOnInit();
}


}
