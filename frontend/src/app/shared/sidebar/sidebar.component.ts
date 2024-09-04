import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userID: string;
  companyID: string;
  user!: User;
  constructor(
    private userService: UserService
    ) {

      this.userID= localStorage.getItem('userID')||'';
      this.companyID= localStorage.getItem('companyID')||'';
    }

    ngOnInit(): void {
      this.getUser();
  }

  getUser(){
    this.userService.getUser(this.userID)
    .subscribe(
      (res:any)=>{
        this.user= res.user;
        // this.rol= res.user.rol;
       }
    )
  }


  logout(){
    this.userService.logout();
  }
}
