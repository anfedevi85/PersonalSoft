import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit{

  dtOptions: DataTables.Settings = {};

  user!: User;
  users!: User[];
  userID : string;
  companyID : string;
  userRol! : string;
  userSelect: string[]=[];
  isMenuOpen: boolean;
  usersCheck:string[]=[];
  constructor(
    private userService: UserService,
    private router: Router
    )
     {
      this.userID= localStorage.getItem('userID')|| '';
      this.companyID= localStorage.getItem('companyID')|| ''
      this.isMenuOpen= false;
    }

    ngOnInit(): void {
      this.getUsers();

      this.dtOptions = {
        scrollY: '530px', // Altura del scroll
        scrollCollapse: false, // Colapsar el scroll cuando no es necesario
        dom:  "<'row'<'col-6'><'col-6'f>>" +
        "<'row'<'col-sm-12't>>"+
        "<'row'<'col-sm-6'i>>",
        // "<'row justify-content-end'<'col-sm-12 'B>>"
      };
    }


    getUsers(){

      this.userService.getAllUsers()
      .subscribe(
        (resp:any)=>{
          this.users= resp.users;
        }
      )
  }


  addUser(){
    this.router.navigateByUrl(`pages/admin/users/new`);
  }
  addCompany(){
    this.router.navigateByUrl(`pages/admin/company/view`);
  }

  selected(event: Event){

    const id= (event.target as HTMLInputElement).value;
    const isChecked= (event.target as HTMLInputElement).checked;


    if (isChecked) {
      console.log(id)
      console.log( isChecked)

      this.userSelect.push(id);
      console.log(this.userSelect);
    }else if (!isChecked) {
      this.userSelect= this.userSelect.filter((item : any)=> item != id);
    }

    console.log(this.userSelect)
  }



  edit(){
    if (this.usersCheck.length === 1) {

      console.log(this.userSelect[0])
      this.router.navigateByUrl(`admin/users/edit/${this.usersCheck[0]}`);
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Select 1 User',
        showConfirmButton: true
      })
    }
  }


  delete(){

    if (this.usersCheck.length === 1) {

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
          this.userService.updateUserStatus(this.usersCheck[0]|| '', this.userID, 'delete')
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

    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Select 1 User',
        showConfirmButton: true
      })
    }
     }



     onRowClick( event: any,item: any ) {
      item.isSelected = !item.isSelected;

      // Verificar que el clic se realizó en la fila y no en algún otro elemento interno
      const id= item._id

      if (id && event.target.tagName !== 'INPUT') {
        // Obtener el checkbox correspondiente y cambiar su estado de selección
        const checkboxElement = document.getElementById(id) as HTMLInputElement;
        // checkboxElement.className= 'selected-row';
        checkboxElement.checked = !checkboxElement.checked;

        if (checkboxElement.checked) {
          this.isMenuOpen=true;
          this.usersCheck.push(id);
        }else if (!checkboxElement.checked) {
          this.usersCheck= this.usersCheck.filter((item : any)=> item != id);
          if (this.usersCheck.length < 1) {
            this.isMenuOpen= false;
          }
        }
      }else if (id && event.target.tagName === 'INPUT') {
        const isChecked= (event.target as HTMLInputElement).checked;
        this.isMenuOpen=true;
        if (isChecked) {
          this.usersCheck.push(id);
        }else if (!isChecked) {
          this.usersCheck= this.usersCheck.filter((item : any)=> item != id);
          if (this.usersCheck.length < 1) {
            this.isMenuOpen= false;
          }
        }
      }
      // console.log(this.usersCheck)
    }
}

