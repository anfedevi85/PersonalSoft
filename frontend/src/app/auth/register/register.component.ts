import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CargarscriptsService } from 'src/app/services/cargarscripts.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

import { FileUploadService } from '../../services/file-upload.service';

import { AlertsService } from 'src/app/services/alerts.service';
import { environment } from 'src/environments/environment';
import { Company } from 'src/app/models/company.model';
const base_url = environment.base_url;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ViewChild('file') file: ElementRef| undefined;
  // private fileTmp: any;
  registerForm!: FormGroup
  menuCurrent: number;
  files: any[];

  attachmentsDB: number;
  logoPath!: string;
  terms: boolean;
  check: boolean;
  imgTemp: any;
  fileName!: string;

  subirArchivo!: File;
  constructor(
    private script: CargarscriptsService,
    private fb : FormBuilder,
    private companyService: CompanyService,
    private userService: UserService,
    private fileuploadService: FileUploadService,
    private alert: AlertsService,
    private router: Router
  ){
    this.menuCurrent=1;

    this.attachmentsDB=0;
    this.files=[];
    this.terms=false;
    this.check=false;
  }

  ngOnInit(): void {
    this.script.cargar(['js/custom/utilities/modals/create-account']);
    console.log(this.menuCurrent, this.router.url);
    this.initForm();

  }


  initForm(){
    this.registerForm= this.fb.group({
      companyName: ['', Validators.required],
      legalName: ['', Validators.required],
      address: ['', Validators.required],
      officePhone: ['', Validators.required],
      officeEmail: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      subscribe: [false]

    })
  }



  continue(){

    switch(this.menuCurrent){
      case 1: this.menuCurrent+= 1;
      break;
      case 2: if (this.registerForm.value.companyName == '' ) {
        this.alert.warning('Company Name is required');
      }else if ( this.registerForm.value.address == '') {
        this.alert.warning('Address is required');
      }else{
        this.menuCurrent+=1
      }
      break;
      case 3 :
        this.menuCurrent+=1
      break;
    }

    console.log(this.menuCurrent);
  }

  back(){
    this.menuCurrent -= 1;
  }

  changeMenuCurrent(num : number){
    this.menuCurrent = num;
  }
  onSelect(event: any){
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event: any){
    this.files.splice(this.files.indexOf(event),1)

  }


  uploadFile(event: any){
    this.subirArchivo=  event.target.files[0];
    this.fileuploadService.archivo(this.subirArchivo, 'companys')
    .then(
      (res: any) => {
        console.log(res);
        this.fileName= res;
    //  this.imgUrl =  `${base_url}/uploads/imagenes/companys/noimage.png`;

    }).catch( err => {
      console.log(err);
      this.alert.error('please check image')
      // Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }


  // sendFile(event: any) :void{
  //   const [ file ] = event.target.files;
  //   console.log(file);
  //   this.fileTmp= {
  //   fileRaw: file,
  //   fileName: file.name
  //   }

  //   const body = new FormData();
  //   body.append('myFile', this.fileTmp.fileRaw, this.fileTmp.fileName )
  //   this.fileuploadService.sendPost(body,'companies' )
  //   .subscribe(
  //     (res:any)=>{
  //     console.log(res);
  //       return res;
  //     }, (err:any)=>{
  //     console.log(err)

  //     }
  //   )
  // }

  async uploadAttachments(){
    this.files.forEach(element => {
      this.fileuploadService.archivo(element, 'companies')
        .then(
          (res: any) => {
            console.log(res);
            this.logoPath= res;
            this.addcompany();
          const archivo = {
            name: element.name,
            size: element.size,
            type: element.type,
            lastModified: element.lastModified,
            url: res

          }
        }).catch( err => {
          console.log(err);
          this.alert.error('image error');
        })

    });



        // this.newEmployeeForm.get('certificates[0].imagePath')?.setValue('');






  }

 async registerCompany(){

  if (this.files.length>0) {
    this.uploadAttachments();

  }else{
    this.addcompany();
  }
    // console.log(this.registerForm.value);
  }



 async addcompany(){
    console.log(this.registerForm.value)
    const {name, Phone, email,position, companyName, ...campos}=this.registerForm.value;

    campos.imagePath= this.logoPath;
  campos.name= companyName;
    this.companyService.addcompany(campos)
    .subscribe(
     async (res:any)=>{
      console.log(res);
      this.newUser(res.company._id);
      }, async (err)=>{
      console.error(err)
      await this.alert.error(err.error.errors);
      }
    );


}



async newUser(companyID: string){
  const {companyName, legalName, address, officePhone, officeEmail, ...campos}=this.registerForm.value;
  campos.company=companyID;
  campos.notification= true;
  console.log(campos);
   this.userService.addUser(campos)
  .subscribe(
   async resp =>{
    this.menuCurrent=5;
    await this.alert.success('Company has been Created');
     } ,async (err: any)=>{
        console.log(err);
        await this.alert.error(err.error.msg);
      }
    );
}


acceptTerms(){
  this.terms=true;
}

checkDisable(){
  this.check=true;
}


}
