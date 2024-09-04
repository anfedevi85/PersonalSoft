import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Company } from '../../../models/company.model';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  user!: User;
  userEdit!: string;
  userID!: string;
  companyID: string;
  editUserForm!: FormGroup;
  companies: Company []=[];

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private fileuploadService:FileUploadService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.userID= localStorage.getItem('userID')||'';
    this.companyID= localStorage.getItem('companyID')||'';
    this.userEdit= this.activatedRoute.snapshot.paramMap.get('id')|| '';
  }


    ngOnInit(): void {
      this.getUser();
    this.getCompanies();

  }


  getUser(){
    this.userService.getUser(this.userEdit)
    .subscribe(
      (res:any)=>{
        this.user= res.user;
        this.formulario();
        console.log(this.user);

      }
    )
  }

  getCompanies(){

    this.companyService.getAllCompanies()
    .subscribe(
      (resp: any)=>{
        this.companies = resp.companies;
      }
    )

  }


  formulario(){
    this.editUserForm = this.fb.group({
      name: [this.user.name, Validators.required],
      phone: [this.user.phone],
      socialSecurity: [this.user.socialSecurity],
      email: [this.user.email, Validators.required],
      address: [this.user.address],
      rol: [this.user.rol, Validators.required],
      company: [this.companyID],
      file: [''],
      userEdit:[this.userID],
    });

  }


  editUser(){

      this.userService.updateUser(this.editUserForm.value, this.userID)
      .subscribe( resp =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User Updated',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('admin/users/new');
        },(err: any)=>{
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.errors,
          });
        }
      );
      this.editUserForm.reset();
}
cancelar(){
  this.editUserForm.reset();
}


back(){
  this.location.back();
}
}
