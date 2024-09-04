import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { differenceInYears, parse, differenceInMonths } from 'date-fns';

import { FileUploadService } from '../../../../services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { environment } from '../../../../../environments/environment';

const base_url = environment.base_url;


@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent implements OnInit{

  companyID!:string;
  newEmployeeForm!: FormGroup;
  userID : string;
  imagen: any;
  subirArchivo!: File;
  subirCertificado!: File;
  fileName!: string;
  url : string;
  certificatePath = 'prueba';
  rol: string;
  fechaNacimiento!: Date;
  hired!: Date;
  edad!: string;
  edadYears!: number;
  edadMonths!: number;
  duration!: string;
  durationYears!: number;
  durationMonths!: number;

  files:any[];

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private fileuploadService:FileUploadService,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.userID= localStorage.getItem('userID')|| '';
    this.imagen=  `../../../../../assets/media/images/noUser.png`;
    this.url = `${base_url}/uploads/imagenes/`;
    this.companyID= localStorage.getItem('companyID')|| '';
    this.rol = this.userService.rol;
    this.files =[];

  }

  ngOnInit(): void {
    this.initForm();
    this.userService.pruebas('6545a39c8b3d78f76e3debb6')
    .subscribe(
      (res:any)=>{
      console.log(res);

      }, (err:any)=>{
      console.log(err)

      }
    )
  }


  initForm(){
    this.newEmployeeForm = this.fb.group({
      name:[''],
      lastname:[''],
      birthdate:[''],
      age:[''],
      socialSecurity:[''],
      education:[''],
      degree:[''],
      contactName:[''],
      contactLastname:[''],
      contactPhone:[''],
      email:[''],
      phone:[''],
      address:[''],
      position:[''],
      permissions:[''],
      compansationType:[''],
      compansationValue:[''],
      commission:[''],
      commissionPercentage:[''],
      annualBaseSalary:[''],
      hired:[''],
      terminated:[''],
      duration:[''],
      reason:[''],
      rol:[''],
      attachments:[],
      company:[this.companyID],
      imagePath:[''],
      userCreated:[this.userID],
      notification:[true],
      certificates:this.fb.array([]),
    });
    }


    addCertificateField(){
      if (this.newEmployeeForm.valid) {

        console.log(this.newEmployeeForm.value.certificates)
        this.certificatesField.push(this.createCertificateField());
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please fill out fields',
          showConfirmButton: false,
          timer: 1500

        })
      }
    }

    removeCertificatedField(index: number){
      const certificates = this.newEmployeeForm.get('certificates') as FormArray;
      certificates.removeAt(index);
    }

    private createCertificateField(){
      return this.fb.group({
        name:[''],
        code:[''],
        expiryDate:[''],
        imagePath:[''],
      })
    }

    get certificatesField(){
      return this.newEmployeeForm.get('certificates') as FormArray;
    }


uploadFile(event: any, index:number){
  if (event.target.files && event.target.files[0]){

    this.subirCertificado = event.target.files[0];
    console.log(this.subirCertificado);

    if (this.subirCertificado.size < 2000000) {
      this.fileuploadService.archivo(this.subirCertificado, 'certificates')
      .then(
        (res: any) => {
        console.log(res);
        this.certificatePath=res;
        const files = this.newEmployeeForm.get('certificates') as FormArray;

        files.controls[index].value.imagePath= this.certificatePath;
          console.log(files.controls[index].value.imagePath);

      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'File size more than 20mb',
        showConfirmButton: false,
        timer: 1500

      })

      this.newEmployeeForm.get('certificates[0].imagePath')?.setValue('');
    }



  }


}


cambiarArchivo(event: any): void{

  if (event.target.files && event.target.files[0]){
    this.subirArchivo = event.target.files[0];
    console.log(this.subirArchivo);
    const reader = new FileReader();
    reader.onload = e => this.imagen =  reader.result;
    reader.readAsDataURL(this.subirArchivo);
  }
}

deleteArchivo(){
  console.log('entro al delete')
  this.imagen=  `../../../../../assets/media/images/noUser.png`;
//   const archivo = document.getElementById('archivo')as HTMLInputElement;

//   if (archivo) {
// console.log(archivo)
//     archivo.value='';
//   }
//   console.log(archivo)
  // this.imagen=  `${base_url}/uploads/imagenes/usuarios/noUser.png`;
}


addUser(){

    this.newUser();

}

newUser(){
  if (this.subirArchivo) {
    this.fileuploadService.archivo(this.subirArchivo, 'usuarios')
.then(
  (res: any) => {
  const fileName= res;
  this.newEmployeeForm.value.imagePath = fileName;
  this.userService.addUser(this.newEmployeeForm.value)
  .subscribe(
    resp =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee has been Created, please check your email address',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('admin/employees/view');
      location.reload();
     } ,(err: any)=>{
        console.log(err.error.msg);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        });
      }
    );
  }).catch( err => {
    console.log(err);
    Swal.fire('Error', 'Image can be upload', 'error');
  });

  }else{
    console.log(this.newEmployeeForm.value);
   this.userService.addUser(this.newEmployeeForm.value)
  .subscribe(
    resp =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Employee has been Created , please check your email address',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('admin/employees/view');
      location.reload();
     } ,(err: any)=>{
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        });
      }
    );
  }
}


cancelar(){
  this.newEmployeeForm.reset();
  this.initForm();
  this.location.back();
}

back(){

  this.location.back();
}

onFileAdded(event: any) {
    // Manejo de archivo agregado
    console.log(event.addedFiles);
  }

  calcularAge(){
    const fechaActual = new Date(); // Obtiene la fecha actual
    this.fechaNacimiento=parse(this.newEmployeeForm.value.birthdate.toString(), 'yyyy-MM-dd', new Date()) ;
    this.edadYears = differenceInYears(fechaActual, this.fechaNacimiento);
    this.edadMonths = differenceInMonths(fechaActual, this.fechaNacimiento);
    const months= this.edadMonths-(this.edadYears*12)
    this.edad=  `${this.edadYears} YO`;
    console.log(this.edad);
  }

  calcularDuration(){
    const fechaActual = new Date(); // Obtiene la fecha actual
    this.hired=parse(this.newEmployeeForm.value.hired.toString(), 'yyyy-MM-dd', new Date()) ;
    this.durationYears = differenceInYears(fechaActual, this.hired);
    this.durationMonths = differenceInMonths(fechaActual, this.hired);
    const months= this.durationMonths-(this.durationYears*12)
  this.duration=  `${this.durationYears} yr ${months} mo`;
  }

  onSelect(event: any){
    this.files=[];
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any){
    this.files.splice(this.files.indexOf(event),1)

  }


}
