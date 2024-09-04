import { Component, OnInit, ViewChild } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { environment } from '../../../../../environments/environment';
const base_url = environment.base_url;


@Component({
  selector: 'app-employeecertificates',
  templateUrl: './employeecertificates.component.html',
  styleUrls: ['./employeecertificates.component.css']
})
export class EmployeecertificatesComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;




  dtOptions: DataTables.Settings = {};
  users!:User[];
  usersCheck:string[]=[];
  userID : string;
  companyID : string;
  jobFileID!: string;
  status!: string;
  newStatus!: string;
  employeeID: string;
  certificates: any;
  certificatePath!:any;

  constructor(
    private userService: UserService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  )
     {
      this.userID= localStorage.getItem('userID')|| '';
      this.companyID= localStorage.getItem('companyID')|| '';
      this.employeeID= this.activatedRoute.snapshot.paramMap.get('id')|| '';
    }

    ngOnInit(): void {
      this.getEmployee()

  }

  initTable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      lengthMenu: [10, 25, 50, 100],
      // dom:  '<"top"lf>rt<"bottom"ip><"clear">',
      dom:  "<'row'<'col-6'l><'col-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-6'i><'col-sm-6'p>>"+
      "<'row justify-content-end'<'col-sm-12 'B>>",
      // search: {
      //   search: 'Active', // Filtro inicial para la columna
      //   smart: false, // Opcional: desactiva la búsqueda inteligente
      //   regex: false, // Opcional: desactiva el uso de expresiones regulares
      //   caseInsensitive: false // Opcional: búsqueda sin distinción entre mayúsculas y minúsculas
      // }
    };
  }

  getEmployee(){

    this.userService.getUser(this.employeeID)
      .subscribe(
         (res:any) => {
          console.log(res)
           this.certificates= res.user.certificates;
           this.initTable();
           console.log(this.certificates)
        }
      )
  }



  selected(event: Event){

    const id= (event.target as HTMLInputElement).value;
    const isChecked= (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.usersCheck.push(id);
    }else if (!isChecked) {
      this.usersCheck= this.usersCheck.filter((item : any)=> item != id);
    }
  }


  addCertificate(){
    console.log('addCertificate()')
  }

  edit(){

    if (this.usersCheck.length === 1) {

     console.log('hola')

      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Select 1 Job File',
          showConfirmButton: true
        })
      }

  }

  view(){

    if (this.usersCheck.length === 1) {
      this.certificates.forEach((element:any) => {
        if (element._id === this.usersCheck[0]) {
           this.certificatePath = element;
       const nombre=    this.certificatePath.imagePath.split('.');
       console.log(nombre);
       const type= nombre[nombre.length-1];
       console.log(type);
          if (type ==='pdf') {
            window.open(`${base_url}/uploads/imagenes/${this.certificatePath.imagePath}`)
          }else{

           Swal.fire({
            title: `${this.certificatePath.name}`,
            text: this.certificatePath.code,
            imageUrl: `${base_url}/uploads/imagenes/${this.certificatePath.imagePath}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
          }

        }


      });



  }else{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Select 1 Certificate',
      showConfirmButton: true
    })
  }
  }
  delete(){
    console.log(this.usersCheck);

    if (this.usersCheck.length === 1) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteCertificate(this.employeeID, this.usersCheck[0])
        .subscribe(
          (res:any)=>{
          console.log(res);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Certificate has been Deleted ',
            showConfirmButton: false,
            timer: 2000
          });
          this.getEmployee();
          }, (err:any)=>{
          console.log(err)

          }
        )

      }
    })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Select 1 Certificate',
        showConfirmButton: true
      })
    }
  }

}
