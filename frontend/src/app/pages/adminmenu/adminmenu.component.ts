import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.css']
})
export class AdminmenuComponent implements OnInit {

  userID : string;
  companyID : string;
  company!: Company;

constructor(
  private companyService: CompanyService
){
  this.userID= localStorage.getItem('userID')|| '';
  this.companyID= localStorage.getItem('companyID')|| '';
}

  ngOnInit(): void {
    console.log(this.companyID);
    this.companyService.getcompany(this.companyID)
    .subscribe(
      (res:any)=>{
      console.log(res);
      this.company= res.company;
      }, (err:any)=>{
      console.log(err)

      }
    )
  }


}
