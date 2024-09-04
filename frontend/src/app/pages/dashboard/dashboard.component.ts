import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  companyID: string;
  userID: string;
  imgCompany!: string;
  token: string;

  user!: User;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.companyID= localStorage.getItem('companyID')||'';
    this.userID= localStorage.getItem('userID')||'';
    this.token= localStorage.getItem('userID')||'';
  }


  ngOnInit(): void {

    console.log(this.userID);
    this.userService.getUser(this.userID)
    .subscribe(
      (res:any)=>{
      console.log(res.user);
      this.user= res.user;
      this.imgCompany= this.user.company.imagePath;
      console.log(this.imgCompany);
      if (this.token!=='') {
        this.userService.validarToken()
        .subscribe(
          (res:any)=>{
          console.log(res);
            if (res === true) {
              // this.recargar();
              this.router.navigate(['/admin'])
            }
          }, (err:any)=>{
          console.log(err)

          }
        )
        // this.recargar();
      }else{
        this.router.navigate(['/login'])
        }
      }, (err:any)=>{
      console.log(err)

      }
    )
  }


  recargar(){
    setInterval("window.location.reload()",50);
    this.router.navigate(['/admin'])
  }
}
