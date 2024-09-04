import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CompanyService } from '../../../services/company.service';
import { Company } from 'src/app/models/company.model';
import { FileUploadService } from '../../../services/file-upload.service';

import { environment } from '../../../../environments/environment';

import { Location } from '@angular/common';
import { AlertsService } from 'src/app/services/alerts.service';
const base_url = environment.base_url;

@Component({
  selector: 'app-profilecompany',
  templateUrl: './profilecompany.component.html',
  styleUrls: ['./profilecompany.component.css']
})
export class ProfilecompanyComponent implements OnInit {

  @ViewChild('file') file: ElementRef| undefined;

  company! : Company ;
  companyID!:string;
  editCompanyForm!: FormGroup;
  userID : string;
  imgUrl: any ;
  imgTemp: any;
  imagen: any;
  subirArchivo!: File;
  fileName!: string;
  url : string;

  disabledForm: boolean;
  private fileTmp: any;

  constructor(
    private fb:FormBuilder,
    private companyService: CompanyService,
    private fileuploadService:FileUploadService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alert : AlertsService
  ) {
    this.userID= localStorage.getItem('userID')|| '';
    this.imgUrl=  `${base_url}/uploads/imagenes/companies/noLogo.jpg`;
    this.url = `${base_url}/uploads/imagenes/`;
    this.companyID= this.activatedRoute.snapshot.paramMap.get('id')|| '';
    this.disabledForm= true;
  }

  ngOnInit(): void {

    this.getcompany();

  }


  initForm(){
    this.editCompanyForm = this.fb.group({

      name:[this.company.name],
      address:[this.company.address],
      legalName:[this.company.legalName],
      legalAddress:[this.company.legalAddress],
      unit:[this.company.unit],
      street:[this.company.street],
      city:[this.company.city],
      province:[this.company.province],
      postalCode:[this.company.postalCode],
      country:[this.company.country],
      website:[this.company.website],
      officeEmail:[this.company.officeEmail],
      officePhone:[this.company.officePhone],
      billingEmail:[this.company.billingEmail],
      billingPhone:[this.company.billingPhone],
      billingAddress:[this.company.billingAddress],
      billingUnit:[this.company.billingUnit],
      billingStreet:[this.company.billingStreet],
      billingCity:[this.company.billingCity],
      billingProvince:[this.company.billingProvince],
      billingPostalCode:[this.company.billingPostalCode],
      billingCountry:[this.company.billingCountry],
      language:[this.company.language],
      currency:[this.company.currency],
      timeZone:[this.company.timeZone],
      lengthUnit:[this.company.lengthUnit],
      temperatureScale:[this.company.temperatureScale],
      humidityScale:[this.company.humidityScale],
      xactimate:[this.company.xactimate],
      jobNumberFormat:[this.company.jobNumberFormat],
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
        this.imagen= `${base_url}/uploads/imagenes/${this.company.imagePath}`
        // this.getCitiesDB();
        this.initForm();
      }
    )

  }


  // selectProvince(event: Event){
  //   console.log('seleccionar provincia');
  //   const province= (event.target as HTMLInputElement).value;
  //   console.log(province);
  //   this.getCities(province);
  // }


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

  // getCitiesDB(){
  //   this.companyService.getCities(this.company.province)
  //   .subscribe(
  //     (res:any)=>{
  //     this.cities= res.cities;
  //     // console.log(this.cities)
  //     }, (err:any)=>{
  //     console.log(err)

  //     }
  //   )
  // }

cambiarArchivo(event: any): void{

  if (event.target.files && event.target.files[0]){
    this.subirArchivo = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgTemp =  reader.result;
      reader.readAsDataURL(this.subirArchivo);
  }


  const [ file ] = event.target.files;
  console.log(file);
  this.fileTmp= {
    fileRaw: file,
    fileName: file.name
  }
}


sendFile():void{

  const body = new FormData();
  body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName )
  this.fileuploadService.sendPost(body,'companies' )
  .subscribe(
    (res:any)=>{
    console.log(res);
      return res;
    }, (err:any)=>{
    console.log(err)

    }
  )
}

uploadFile(){
  console.log(this.subirArchivo);
  this.fileuploadService.archivo(this.subirArchivo, 'companies')
  .then(
    (res: any) => {
      console.log(res);
  this.fileName= res;
   this.imgUrl =  `${base_url}/uploads/imagenes/companies/noLogo.jpg`;

  }).catch( err => {
    console.log(err);
    Swal.fire('Error', 'No se pudo subir la imagen', 'error');
  })
}

 editCompany(){

  if (this.subirArchivo) {
    const body = new FormData();
    body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName )
    this.fileuploadService.sendPost(body,'companies' )
  .subscribe(
    (res:any)=>{
    console.log(res);
    this.editCompanyForm.value.imagePath = `companies/${res.url.filename}`;
    this.companyService.updatecompany(this.editCompanyForm.value, this.company._id||'')
    .subscribe(async (res: any) =>{
    await  this.alert.success('The Company Profile has been updated successfully');
        // this.router.navigateByUrl(companys/new');
        this.disabledForm= true;
      },err=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.errors,
        });
      }
    );
    }, (err:any)=>{
    console.log(err)

    }
  )
  }else{
    this.companyService.updatecompany(this.editCompanyForm.value, this.company._id||'')
    .subscribe(async (res: any) =>{
      await  this.alert.success('The Company Profile has been updated successfully');
      // this.router.navigateByUrl(companys/new');
      this.disabledForm= true;
      },err=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.errors,
        });
      }
    );

  }

}

cancelar(){
  this.imgTemp=this.imagen;
  this.initForm();
  this.disabledForm= !this.disabledForm;
}

back(){

  this.location.back();
}

companyAddress(place: any) {
  console.log(place); // Aquí puedes trabajar con el lugar seleccionado
  const direccion = `${place.formatted_address}`
  this.editCompanyForm.get('street')?.setValue(direccion, {emitEvent: true});
  this.editCompanyForm.get('city')?.setValue(place.address_components[1].long_name, {emitEvent: true});
  this.editCompanyForm.get('province')?.setValue(place.address_components[place.address_components.length-3].short_name, {emitEvent: true});
  this.editCompanyForm.get('postalCode')?.setValue(place.address_components[place.address_components.length-1].long_name, {emitEvent: true});
  this.editCompanyForm.get('country')?.setValue(place.address_components[place.address_components.length -2].long_name, {emitEvent: true});
}


legalAddress(place: any) {
  console.log(place); // Aquí puedes trabajar con el lugar seleccionado
  const direccion = `${place.formatted_address}`
  this.editCompanyForm.get('billingStreet')?.setValue(direccion, {emitEvent: true});
  this.editCompanyForm.get('billingCity')?.setValue(place.address_components[1].long_name, {emitEvent: true});
  this.editCompanyForm.get('billingProvince')?.setValue(place.address_components[place.address_components.length-3].short_name, {emitEvent: true});
  this.editCompanyForm.get('billingPostalCode')?.setValue(place.address_components[place.address_components.length-1].long_name, {emitEvent: true});
  this.editCompanyForm.get('billingCountry')?.setValue(place.address_components[place.address_components.length -2].long_name, {emitEvent: true});
}



editButton(){

  this.disabledForm= !this.disabledForm;
}

deleteImage(){

  this.imgTemp= '../../../../assets/media/varias/noimage.jpg'
  this.editCompanyForm.value.imagePath = 'companies/noimage.jpg';
}

}
