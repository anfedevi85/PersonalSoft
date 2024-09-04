import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit{

  user!: User;
  companies: Company[]=[];
  userID : string;
  companyID : string;
  userRol! : string;
  newUserForm!: FormGroup;

  constructor( private fb:FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private location : Location,
    private router: Router,
    private alert : AlertsService
    )
     {
      this.userID= localStorage.getItem('userID')|| '';
      this.companyID= localStorage.getItem('companyID')|| '';
    }

    ngOnInit(): void {
      this.cargarcompanies();
      this.initForm();
    }

  cargarcompanies(){
    this.companyService.getAllCompanies()
    .subscribe(
      (resp:any)=>{
        this.companies = resp.companies;
        console.log(this.companies)
      }
    )

  }

  initForm(){
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
      address: [''],
      rol: ['', Validators.required],
      company: [this.companyID],
      userCreated:[this.userID],
    });
  }





  addUser() {

     this.userService.addUser(this.newUserForm.value)
    .subscribe(
       (resp) =>{
        console.log(resp);
        this.alert.success('User Has Been Created')
        this.newUserForm.reset();
        this.location.back();

       } ,(err: any)=>{
          console.log(err);
          this.alert.error(err.error.msg)
        }

        );
      }


  edit(user: User){
 this.router.navigateByUrl(`pages/users/edit/${user._id}`);
  }


  delete(user: User){


    Swal.fire({
      title: 'Are you Sure?',
      text: "Delete User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUserStatus(user._id|| '', this.userID, 'delete')
   .subscribe(
    (res:User)=>{
      Swal.fire(
        'Deleted!',
        `User ${res.name} has been deleted`,
        'success'
      )
      window.location.reload();
    });
  }
  });
     }

  back(){

      this.location.back();
    }

}
