import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CargarscriptsService } from 'src/app/services/cargarscripts.service';
import { Company } from 'src/app/models/company.model';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
const base_url= environment.base_url;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  @Input() jobFileID!: string;

  userID: string;
  user!: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private shared:SharedService,

    // private childComponent: JobdetailsComponent
  ) {
    this.userID= localStorage.getItem('userID')||'';
    this.jobFileID= '';
  }

  ngOnInit() {
  this.userService.getUser(this.userID)
  .subscribe(
    (res:any)=>{
    console.log(res);
    this.user= res.user;
    console.log(this.jobFileID);
    }, (err:any)=>{
    console.log(err)

    }
  )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["jobFileID"]) {
      // La jobFileID ha cambiado
      const nuevoValor = changes["jobFileID"].currentValue;
      // ... usar el nuevo valor
    }
  }

  logout(){
    this.userService.logout();
  }
}
