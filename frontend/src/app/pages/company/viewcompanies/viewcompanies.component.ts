import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { CompanyService } from '../../../services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-viewcompanies',
  templateUrl: './viewcompanies.component.html',
  styleUrls: ['./viewcompanies.component.css']
})
export class ViewcompaniesComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  companies!: Company[];
  userID : string= localStorage.getItem('userID')|| '';
  companySelect: string[]=[];
  constructor(
    private companyService: CompanyService,
    private router: Router,
  ) {
  }

    ngOnInit(): void {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // dom:  '<"top"lf>rt<"bottom"ip><"clear">',
      dom:  "<'row'<'col-6'l><'col-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row '<'col-6'i><'col-6'p>>"+
      "<'row'<'col-sm-12 'B>>"
    }
      this.companyService.getAllCompanies()
      .subscribe(
        (resp: any)=>{
          this.companies= resp.companies;
          console.log(this.companies);
        }
      )
  }

  addCompany(){

    this.router.navigateByUrl(`pages/company/new`);
  }

selected(event: Event){

  const id= (event.target as HTMLInputElement).value;
  const isChecked= (event.target as HTMLInputElement).checked;


  if (isChecked) {
    console.log(id)
    console.log( isChecked)

    this.companySelect.push(id);
    console.log(this.companySelect);
  }else if (!isChecked) {
    this.companySelect= this.companySelect.filter((item : any)=> item != id);
  }

  console.log(this.companySelect)
}



edit(){
  if (this.companySelect.length === 1) {

    console.log(this.companySelect[0])
    this.router.navigateByUrl(`pages/company/edit/${this.companySelect[0]}`)
  }else{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Select 1 Company',
      showConfirmButton: true
    })
  }
}

delete(){
  console.log(this.companySelect);

  if (this.companySelect.length === 1) {
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
    this.companyService.updateStatuscompany(this.companySelect[0], this.userID, 'Deleted')
    .subscribe(
      (res:any)=>{
      console.log(res);
      Swal.fire(
        'Deleted!',
        'Company has been deleted.',
        'success'
      )
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
      title: 'Select 1 Company',
      showConfirmButton: true
    })
  }
}



}

