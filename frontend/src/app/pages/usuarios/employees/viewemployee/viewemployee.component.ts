import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';


import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['../../../../../styles.css']
})
export class ViewemployeeComponent implements OnInit {

  // @ViewChild(DataTableDirective, { static: false })
  // datatableElement!: DataTableDirective;
  @ViewChild('closeEditUser') closeEditUser!: ElementRef;
  dtOptions: DataTables.Settings = {};
  users!:User[];
  usersCheck!:string;
  userID : string;
  editUser! : User;
  companyID : string;
  jobFileID!: string;
  status!: string;
  newStatus!: string;
  isMenuOpen: boolean;
  activeUserForm!: FormGroup
  userSelectedID!: string
  constructor(
    private userService: UserService,
    private router: Router,
    private alert : AlertsService,
    private fb:FormBuilder,
  )
     {
      this.userID= localStorage.getItem('userID')|| '';
      this.companyID= localStorage.getItem('companyID')|| '';
      this.isMenuOpen= false;

    }

    ngOnInit(): void {
      this.usersCheck='vacio';
      this.getUsers();
  }

  getUsers(){
    this.userService.getAllUserscompany(this.companyID)
      .subscribe(
         (res:any) => {
          console.log(res)
           this.users= res.users;
           this.initTable();


        }
      )
  }

  initTable(){

    this.dtOptions = {
      scrollY: '500px', // Altura del scroll
      scrollCollapse: false, // Colapsar el scroll cuando no es necesario
      dom:  "<'row'<'col-6'><'col-6'f>>" +
      "<'row'<'col-sm-12't>>" +
      "<'row'<'col-12'i>>",
    };
  }


  initForm(){

    this.activeUserForm= this.fb.group({
      name:[this.editUser.name],
      email:[this.editUser.email],
      phone:[''],
      userEdit:[this.userID]
      // unit:[''],
      // street:[''],
    });
  }

   addEmployee() {
    console.log("newemployeee----------------");
    this.router.navigate(['/admin','employees','new'])
  }


// async  resetTableData() {
//     if (this.datatableElement.dtInstance) {
//       this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         // Limpiar los datos de la tabla

//         dtInstance.clear().draw();

//       });
//     }
//   }


//  async loadNewData() {
//     if (this.datatableElement.dtInstance) {
//       this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         // Cargar los nuevos datos
//         dtInstance.rows.add(this.users).draw();

//       });
//     }
//   }


  // initFilter(){
  //   if (this.datatableElement.dtInstance) {

  //     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.column(8).search('Active',false,false,false).draw();
  //     });
  //   }
  // }


  // async filter(event: Event){

  //   const status= (event.target as HTMLInputElement).value;
  //   console.log(status);
  //   if (this.datatableElement.dtInstance) {
  //     this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.columns(8).search(status, false, false, false).draw();
  //     });
  //   }


  // }


  onRowClick( event: any,item: any ) {

    console.log('onRowClick');
    console.log(item);

    if (this.usersCheck === 'vacio') {
      item.isSelected =true;
      this.usersCheck=item._id;
      this.isMenuOpen=true;
      console.log(this.usersCheck);
    }else if (item._id === this.usersCheck) {
      item.isSelected = false;
      this.usersCheck='vacio';
      this.isMenuOpen=false;
      console.log(this.usersCheck);
    }else if(this.usersCheck != "vacio" && item._id != this.usersCheck){
      item.isSelected = true;
      this.users.forEach(element => {
      if (element._id === this.usersCheck) {
        element.isSelected= false;
       }
      });
      this.usersCheck=item._id;
      this.isMenuOpen=true;
      console.log(this.usersCheck);
    }
  }

  stopClick(event: any) {
    // Tu código para el click en la fila
    console.log("Fila clickeada!");

    // Evitar que el click se propague a la columna
    event.stopPropagation();
  }

  edit(){

    console.log(this.usersCheck);
    this.router.navigate(['/admin','employees','edit',this.usersCheck]);

  }


  activeUser(item : User){
    this.editUser = item;
    this.initForm();
    console.log(this.editUser);
  }
 active(){

console.log(this.activeUserForm.value);

this.userService.activeUser(this.editUser._id || '', this.activeUserForm.value.phone)
       .subscribe(
        (res:any)=>{
        console.log(res);
        this.getUsers();
        this.closeModalEditUser();
        }, (err:any)=>{
        console.log(err)

        this.alert.error(err.error.msg)
        })

    // await Swal.fire({
    //   title: 'Active User?',
    //   text:'Please confirm Phone Number',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   input: 'text',
    //   inputValidator: (value) => {
    //     // Remove non-numeric characters
    //     const formattedValue = value.replace(/[^0-9]/g, '');

    //     // Format as (area code) local number
    //     const areaCodeLength = 3; // Assuming area code is 3 digits
    //     const localNumberLength = 7; // Assuming local number is 7 digits

    //     if (formattedValue.length <= areaCodeLength + localNumberLength) {
    //       const areaCode = formattedValue.slice(0, areaCodeLength);
    //       const localNumber = formattedValue.slice(areaCodeLength);
    //       return `(${areaCode}) ${localNumber}`;
    //     } else {
    //       // Format as country code - area code - local number
    //       const countryCodeLength = 1; // Assuming country code is 1 digit
    //       const countryCode = formattedValue.slice(0, countryCodeLength);
    //       const areaCode = formattedValue.slice(countryCodeLength, countryCodeLength + areaCodeLength);
    //       const localNumber = formattedValue.slice(countryCodeLength + areaCodeLength);
    //       return `+${countryCode} - (${areaCode}) ${localNumber}`;
    //     }
    //   },
    //   confirmButtonText: 'Active',
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //    console.log(result.value);
    //    this.userService.activeUser(id, result.value)
    //    .subscribe(
    //     (res:any)=>{
    //     console.log(res);
    //     this.getUsers();
    //     }, (err:any)=>{
    //     console.log(err)

    //     this.alert.error(err.error.msg)
    //     }
    //    )
    //   }
    // });

  }

  closeModalEditUser() {
    this.closeEditUser.nativeElement.click();
}

  formatPhoneNumber(inputValue: string) {
    // Implement logic to format the input value as a phone number
    // You can use regular expressions, string manipulation, or a third-party library
    // for phone number formatting

    // Example: Basic phone number formatting using string manipulation
    const formattedValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const areaCodeLength = 3; // Assuming area code is 3 digits
    const localNumberLength = 7; // Assuming local number is 7 digits

    if (formattedValue.length <= areaCodeLength + localNumberLength) {
      // Format as (area code) local number
      const areaCode = formattedValue.slice(0, areaCodeLength);
      const localNumber = formattedValue.slice(areaCodeLength);
      return `(${areaCode}) ${localNumber}`;
    } else {
      // Format as country code - area code - local number
      const countryCodeLength = 1; // Assuming country code is 1 digit
      const countryCode = formattedValue.slice(0, countryCodeLength);
      const areaCode = formattedValue.slice(countryCodeLength, countryCodeLength + areaCodeLength);
      const localNumber = formattedValue.slice(countryCodeLength + areaCodeLength);
      return `+${countryCode} - (${areaCode}) ${localNumber}`;
    }
  }

  inactive(id: any){

    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      // text: `User will be updated`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.inactiveUser(id)
        .subscribe(
          (res:any)=>{
          console.log(res);
            this.getUsers();
          }, (err:any)=>{
          console.log(err)

          }
        )
      }
    })

  }


changeStatus(userID: string, status: string){
 this.userService.updateUserStatus(userID, this.userID, status)
            .subscribe((res:any)=>{
              console.log(res);
              Swal.fire(
                'Done!',
                `Employee has been ${status}`,
                'success'
              )
              this.ngOnInit();
              }, (err:any)=>{
              console.log(err)

              }
            );
}


  delete(id : any){

    this.users.forEach(element => {
      if (element._id === id) {
        element.isSelected= false;
       }
      });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won'to be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updateUserStatus(id, this.userID, 'Deleted')
        .subscribe(
          (res:any)=>{
          console.log(res);
          Swal.fire(
            'Deleted!',
            'Your Employee has been deleted.',
            'success'
          )

          this.ngOnInit();

          }, (err:any)=>{
          console.log(err)

          }
        )

      }
    })
  }

}




