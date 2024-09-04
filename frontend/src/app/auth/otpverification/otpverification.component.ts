import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent {
  @ViewChild ('miBoton') miBoton!: ElementRef;

  verifyForm!: FormGroup;
  userID: string;
  user!: User;
  OTP: string;
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
    this.OTP='';
  }

ngOnInit(): void {
  this.initForm();

  this.userService.generarOTP(this.userID)
  .subscribe(
    (res:any)=>{
      console.log(res);
      this.user= res.user;
      if (this.user.verificationCode) {
        this.alert.error('User Already verify OTP')
        this.router.navigate(['/login']);
      }
      this.ultimos4 = res.user.phone.slice(-4);
      this.fechaOTP= new Date(res.user.fechaOTP);
      this.OTP=res.user.OTP;
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
  console.log(this.fechaVerificacion);
  console.log(this.fechaOTP);
  const diferencia = Math.floor((this.fechaVerificacion - this.fechaOTP)/(1000*60));
  console.log(diferencia);
  if (this.verifyForm.value.verify !== this.OTP) {
    this.alert.error('Provided verification code invalid')
  }else if(this.verifyForm.value.verify === this.OTP && diferencia<=5){
    console.log(this.verifyForm.value.verify);
    this.userService.verifyOTP(this.userID,this.verifyForm.value.verify )
    .subscribe(
      async (res:any)=>{
      console.log(res);
      await this.alert.success('Verification code entered successfully!');
      this.router.navigate(['/admin'] );
      if (!res.user.newPassword) {
        this.miBoton.nativeElement.click();
      }
      }, (err:any)=>{
      console.log(err)

      }
    )}
    else{
        this.alert.error('Provided verification code expired')
      }

}

noCode(){

  this.fechaVerificacion= new Date();
  console.log(this.fechaVerificacion);
  console.log(this.fechaOTP);
  const diferencia = Math.floor((this.fechaVerificacion - this.fechaOTP)/(1000*60));
  console.log(diferencia);

  if (diferencia>5) {

    this.alert.success('A new 6-digits verification code has been sent successfully!')
    // this.ngOnInit();
  }else{
    this.alert.error('for new OTP you have to wait 5 min!')

  }
}


}

