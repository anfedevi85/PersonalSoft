import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Company } from '../../../models/company.model';
import Swal from 'sweetalert2';

import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
const base_url = environment.base_url;

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  user!: User;
  userEdit!: User;
  userID!: string;
  userEditID: string;
  editUserForm!: FormGroup;
  companies: Company []=[];
  companyID: string;
  subirArchivo!: File;

  imgUrl: string ;
  imgTemp: any;

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private fileuploadService:FileUploadService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.imgUrl=  `${base_url}/uploads/imagenes/usuarios/noUser.png`;
    this.userEditID= localStorage.getItem('userID')|| '';
    this.companyID= localStorage.getItem('companyID')|| '';
  }

  ngOnInit(): void {
    this.getUserEdit();
    this.getUser();
    this.cargarcompanys();
  }

  getUserEdit(){
    this.userService.getUser(this.userEditID)
    .subscribe(
      (res:User)=>{
        this.userEdit= res;
      }
    )
  }

  getUser(){
    this.userID= this.activatedRoute.snapshot.paramMap.get('id')|| '';
    this.userService.getUser(this.userID)
    .subscribe(
      (res:User)=>{
        this.user= res;
        this.formulario();
      }
    )
  }

  cargarcompanys(){

    this.companyService.getAllCompanies()
    .subscribe(
      (resp:Company[])=>{
        this.companies = resp;
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
      userEdit:[this.userID]
    });

  }


  cambiarArchivo(event: any): void{

    if (event.target.files && event.target.files[0]){
      this.subirArchivo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgTemp =  reader.result;
      reader.readAsDataURL(this.subirArchivo);
    }
  }


  editUser(){
    if (this.subirArchivo) {
      this.fileuploadService.archivo(this.subirArchivo, 'usuarios')
    .then(
      (res: any) => {

      const fileName= res;
      this.editUserForm.value.imagePath = fileName;
      this.userService.updateUser(this.editUserForm.value, this.userID||'')
      .subscribe( (res:User) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `User ${res.name} has bee updated`,
          showConfirmButton: false,
          timer: 2000
        });
          this.router.navigateByUrl('admin/users/new');
        },err=>{
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.errors,
          });
        }
      );
      this.editUserForm.reset();

    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
    }else{
      this.userService.updateUser(this.editUserForm.value, this.userID)
      .subscribe( (res: User) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `User ${res.name} has bee updated`,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('admin/users/new');
        },err=>{
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.errors,
          });
        }
      );
      this.editUserForm.reset();

    }
}
cancelar(){
  this.location.back();
}
}
