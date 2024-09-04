import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { CargarscriptsService } from 'src/app/services/cargarscripts.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas: any;


  user!: User;
  companies: Company[]=[];
  userID : string;
  companyID : string;
  userRol! : string;
  editUserForm!: FormGroup;

  caracteres: boolean;
  mayusculas: boolean;
  minusculas: boolean;
  numeros: boolean;
  simbolos: boolean;
  cumple: boolean;

  constructor( private fb:FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private location : Location,
    private router: Router,
    private scripts : CargarscriptsService,
    private alert: AlertsService
    )
     {
      this.userID= localStorage.getItem('userID')|| '';
      this.companyID= localStorage.getItem('companyID')|| '';
      this.caracteres=false;
      this.mayusculas=false;
      this.minusculas=false;
      this.numeros=false;
      this.simbolos=false;
      this.cumple=false;
    }


    ngOnInit(): void {
      this.getUser();

      // this.scripts.cargar(['js/custom/authentication/reset-password/new-password']);


    }

    getUser(){
      this.userService.getUser(this.userID)
      .subscribe(
        (res:any)=>{
        console.log(res);
        this.user= res.user;
        this.initForm();
        }, (err:any)=>{
        console.log(err)

        }
      )
    }

  initForm(){
    this.editUserForm = this.fb.group({
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      phone: [this.user.phone],
      email: [this.user.email, Validators.required],
      address: [this.user.address],
      position: [this.user.position, Validators.required],
      password:[''],
      newPassword2:[''],
      signPath:[''],
      company: [this.companyID],
      userCreated:[this.userID],
    });
  }


  verificarCadena(texto: string): boolean {
    // Expresión regular que verifica los requisitos
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
console.log(texto);
    // Comprobar si el texto cumple con la expresión regular
    return regex.test(texto);
  }


  contieneMayuscula(cadena: string): boolean {
    const regex = /[A-Z]/; // Expresión regular para buscar una letra mayúscula
    return regex.test(cadena);
  }

  contieneMinuscula(cadena: string): boolean {
    const regex = /[a-z]/; // Expresión regular para buscar una letra mayúscula
    return regex.test(cadena);
  }

  contieneNumeros(cadena: string): boolean {
    const regex = /[0-9]/; // Expresión regular para buscar una letra mayúscula
    return regex.test(cadena);
  }


  contieneSimbolos(cadena: string): boolean {
    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-=]/; // Expresión regular para buscar una letra mayúscula
    return regex.test(cadena);
  }
  cadena(){
    console.log(this.editUserForm.value.password);
    if (this.contieneMayuscula(this.editUserForm.value.password)) {
      this.mayusculas=true;
    }else{
      this.mayusculas=false
    }

    if (this.contieneMinuscula(this.editUserForm.value.password)) {
      this.minusculas=true;
    }else{
      this.minusculas=false
    }

    if (this.contieneNumeros(this.editUserForm.value.password)) {
      this.numeros=true;
    }else{
      this.numeros=false
    }

    if (this.contieneSimbolos(this.editUserForm.value.password)) {
      this.simbolos=true;
    }else{
      this.simbolos=false
    }

    if (this.editUserForm.value.password.length >= 8) {
      this.caracteres= true;
    }else{
      this.caracteres=false;
    }

    if (this.caracteres && this.mayusculas && this.minusculas && this.numeros && this.simbolos) {
      this.cumple=true
    }else{
      this.cumple=false
    }
  }

  editUser(){

    if ( !this.cumple) {

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Use 8 or more characters with a mix of letters, numbers & symbols',
        showConfirmButton: false,
        timer: 2500

      })

    }else if (this.editUserForm.value.password != this.editUserForm.value.newPassword2) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Passwords do not match',
        showConfirmButton: false,
        timer: 2500

      })
    }
    else if(this.editUserForm.value.password === this.editUserForm.value.newPassword2 && this.cumple){
      this.userService.updateUserPassword(this.editUserForm.value, this.userID)
      .subscribe(
        (res:any)=>{
        console.log(res);
        this.alert.success('New password created successfully!');
        window.location.reload();
        }, (err:any)=>{
        console.log(err)

        }
      )
    }
  }


    back(){

      this.location.back();
    }





    // Configura las opciones del SignaturePad según tus necesidades

    signaturePadOptions: object = {
      minWidth: 2,
      maxWidth: 4,
      canvasWidth: 500,
      canvasHeight: 600
    };


   async resetSignature(){
      this.user.signature = '' ;
    await  this.alert.warning('Please create a new Signature ');

    }

}
