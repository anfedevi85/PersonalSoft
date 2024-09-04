import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CompanyService } from '../../../services/company.service';
import { Company } from 'src/app/models/company.model';
import { FileUploadService } from '../../../services/file-upload.service';


import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment';
const base_url = environment.base_url;

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})
export class EditcompanyComponent implements OnInit {

  company! : Company ;
  companyID!:string;
  editCompanyForm!: FormGroup;
  userID : string;
  imgUrl: string ;
  imgTemp: any;
  subirArchivo!: File;
  fileName!: string;
  url : string;


  constructor(
    private fb:FormBuilder,
    private companyService: CompanyService,
    private fileuploadService:FileUploadService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.userID= localStorage.getItem('userID')|| '';
    this.imgUrl=  `${base_url}/uploads/imagenes/companys/noimage.png`;
    this.url = `${base_url}/uploads/imagenes/`;
    this.companyID= this.activatedRoute.snapshot.paramMap.get('id')|| '';
  }

  ngOnInit(): void {

    this.getcompany();

  }


  initForm(){
    this.editCompanyForm = this.fb.group({
      name:[this.company.name],
      address:[this.company.address],
      officePhone:[this.company.officePhone],
      officeEmail:[this.company.officeEmail],
      website:[this.company.website],
      province:[this.company.province],
      city:[this.company.city],
      imagePath:[this.company.imagePath],
      userEdit:[this.userID],
    });
    }


  getcompany(){
    this.companyService.getcompany(this.companyID)
    .subscribe(
      (res: any)=>{
        console.log(res);
        this.company= res.company;

        this.initForm();
      }
    )

  }






cambiarArchivo(event: any): void{

  if (event.target.files && event.target.files[0]){
    this.subirArchivo = event.target.files[0];
    console.log(this.subirArchivo);
    const reader = new FileReader();
    reader.onload = e => this.imgTemp =  reader.result;
    reader.readAsDataURL(this.subirArchivo);
  }
}

uploadFile(){
  console.log(this.subirArchivo);
  this.fileuploadService.archivo(this.subirArchivo, 'companys')
  .then(
    (res: any) => {
      console.log(res);
  this.fileName= res;
   this.imgUrl =  `${base_url}/uploads/imagenes/companys/noimage.png`;

  }).catch( err => {
    console.log(err);
    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
  })
}

editCompany(){

  if (this.subirArchivo) {
    this.fileuploadService.archivo(this.subirArchivo, 'companys')
  .then(
    (res: any) => {
      console.log(res);
    const fileName= res;
    this.editCompanyForm.value.imagePath = fileName;
    this.companyService.updatecompany(this.editCompanyForm.value, this.company._id||'')
    .subscribe( (res:Company) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Company ${res.name} has been updated`,
        showConfirmButton: false,
        timer: 2000
      });
        this.router.navigateByUrl('admin/companys/new');
      },err=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.errors,
        });
      }
    );
    this.editCompanyForm.reset();

  }).catch( err => {
    console.log(err);
    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
  });
  }else{
    this.companyService.updatecompany(this.editCompanyForm.value, this.company._id||'')
    .subscribe( (res:Company) =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Company ${res.name} has been updated`,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl('admin/companys/new');
      },err=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.errors,
        });
      }
    );
    this.editCompanyForm.reset();

  }

}

cancelar(){
  this.editCompanyForm.reset();
}

back(){

  this.location.back();
}

}
