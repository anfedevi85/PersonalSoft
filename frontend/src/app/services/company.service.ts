import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Company } from '../models/company.model';

import { environment } from 'src/environments/environment';
const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public company!: Company;
  constructor(
    private http: HttpClient,
  ) {
  }

get token(): string {
    return localStorage.getItem('token') || '';
  }

get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  get companyName():string {
    return this.company.name || '';
  }
  cargarheaders(token: string){
    return {
      headers:{
        'x-token': token
      }
    }
  }

addcompany(formdata: Company){
  console.log(formdata);
  return this.http.post<Company>(`${base_url}/company`, formdata, this.headers);
}

updatecompany(formdata: Company, id : string){
  return this.http.put<Company>(`${base_url}/company/${id}`, formdata, this.headers);
}

updateStatuscompany(id : string, userEdit: string, status: string){
  return this.http.put<Company>(`${base_url}/company/delete/${id}`, {status, userEdit}, this.headers);
}

getcompany(id: string){
  console.log(id);
  return this.http.get<Company>(`${base_url}/company/${id}`, this.headers);
}

getAllCompanies(){
  return this.http.get<Company []>(`${base_url}/company`, this.headers);
}

getCities(province: string){
  return this.http.get(`${base_url}/company/city/${province}`, this.headers);
}

}
