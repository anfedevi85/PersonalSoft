import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';



import { CompanyService } from '../../../services/company.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { Company } from 'src/app/models/company.model';


import { environment } from '../../../../environments/environment';
import { AlertsService } from 'src/app/services/alerts.service';
const base_url = environment.base_url;

@Component({
  selector: 'app-newcompany',
  templateUrl: './newcompany.component.html',
  styleUrls: ['./newcompany.component.css']
})
export class NewcompanyComponent implements OnInit {


  newCompanyForm!: FormGroup;
  userID : string= localStorage.getItem('userID')|| '';
  imgUrl: string ;
  imgTemp: any;
  subirArchivo!: File;
  fileName!: string;
  url : string;



  constructor(
    private fb:FormBuilder,
    private companyService: CompanyService,
    private fileuploadService:FileUploadService,
    private location : Location,
    private alert : AlertsService
  ) {
    this.imgUrl=  `${base_url}/uploads/imagenes/companys/noimage.png`;
    this.url= `${base_url}/uploads/imagenes/`;
    this.initForm();
  }

    ngOnInit(): void {
      console.log('first');
  }

  initForm(){
  this.newCompanyForm = this.fb.group({
    name: ['', Validators.required],
    address: [''],
    officePhone: [''],
    officeEmail: [''],
    website: [''],
    province: [''],
    city: [''],
    imagePath: [''],
    userCreated:[this.userID],
  });
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

selectProvince(event: Event){
  console.log('seleccionar provincia');
  const province= (event.target as HTMLInputElement).value;
  console.log(province);
  // this.getCities(province);
}


// getCities(province: string){
//   this.companyService.getCities(province)
//   .subscribe(
//     (res:any)=>{
//     this.cities= res.cities;
//     console.log(this.cities)
//     }, (err:any)=>{
//     console.log(err)

//     }
//   )
// }

uploadFile(){
  console.log(this.subirArchivo);
  this.fileuploadService.archivo(this.subirArchivo, 'companys')
  .then(
    async  (res: any) => {
      console.log(res);
  this.fileName= res;
   this.imgUrl =  `${base_url}/uploads/imagenes/companys/noimage.png`;

  }).catch( async  err => {
    console.log(err);
    await this.alert.error('error upload image')
    // Swal.fire('Error', 'No se pudo subir la imagen', 'error');
  })
}


  addcompany(){
    console.log(this.newCompanyForm.value)
  if (this.subirArchivo) {
    this.fileuploadService.archivo(this.subirArchivo, 'companys')
  .then(
    res => {
    const fileName= res;
    this.newCompanyForm.value.imagePath = fileName;
    this.companyService.addcompany(this.newCompanyForm.value)
    .subscribe( async (res:Company) =>{
      this.imgTemp =  `${base_url}/uploads/imagenes/companys/noimage.png`;
      console.log(res);
    await  this.alert.success('Company has been created')

      },async  err=>{
        console.error(err);
        await this.alert.error(err.error.errors)
      }
    );


  }).catch( async err => {
    console.log(err);
    await this.alert.error('Error upload image');
  });
  }else{
    this.companyService.addcompany(this.newCompanyForm.value)
    .subscribe(
     async (res:Company)=>{
       this.imgTemp =  `${base_url}/uploads/imagenes/companys/noimage.png`;
      await this.alert.success(`Company has been created`)
      }, async (err)=>{
      console.error(err)
      await this.alert.error(err.error.errors);
      }
    );
  }

}


back(){

  this.location.back();
}
}
