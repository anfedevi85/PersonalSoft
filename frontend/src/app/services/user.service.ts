import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { loginForm } from '../interfaces/login.interface';
import { User } from '../models/user.model';

import { environment } from '../../environments/environment';
const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  token2!: string;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

  }

get token(): string {

    return localStorage.getItem('token') || this.token2 || '';
  }

get headers(){
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  get userID():string {
    return this.user._id || '';
  }


  get companyID():string{
    return  this.user.company._id || "" ;
  }

  get rol():string {
    return this.user.rol || '';
  }


validarToken(): Observable<boolean>{
  console.log('VALIDANDO TOKEN');
return  this.http.get( `${base_url}/login/renew`, this.headers )
 .pipe(
  map((resp:any) => {
   this.user= resp.user;
    localStorage.setItem('token', resp.token);
  }),
  map( resp=> true),

  catchError(error => {
    return of(false);
  })
 );
}

login( formData: loginForm){
  return this.http.post( `${base_url}/login`, formData )
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('userID', resp.userDB._id);
        localStorage.setItem('companyID', resp.userDB.company);
        localStorage.setItem('rol', resp.userDB.rol);
        localStorage.setItem('token', resp.token);
      })
    ) ;

}

generarOTP(userID: string){
  return this.http.get( `${base_url}/login/${userID}`)
}

verifyOTP(id: string, OTP: string){
  console.log([id, OTP]);
  return this.http.post( `${base_url}/login/otp/verify`, {id, OTP} )
  .pipe(
    tap((resp: any) => {
      localStorage.setItem('userID', resp.userDB._id);
      localStorage.setItem('companyID', resp.userDB.company);
      localStorage.setItem('rol', resp.userDB.rol);
      localStorage.setItem('token', resp.token);
    })
  ) ;

}

forgot( email: string){

  return this.http.post( `${base_url}/login/forgot`, {email} )
    // .pipe(
    //   tap((resp: any) => {
    //   })
    // ) ;

}


pruebas(userID: string){
  return this.http.get<User>(`${base_url}/user/pruebas/${userID}`, this.headers);
}


addUser(formdata: User){

  console.log(formdata);
  return this.http.post<User>(`${base_url}/user`, formdata, this.headers);
}

updateUser(formdata: User, id : string){
console.log(formdata);
  return this.http.put<User>(`${base_url}/user/${id}`, formdata, this.headers);
}

inactiveUser(id : string){

    return this.http.put<User>(`${base_url}/user/${id}`, {status:'Inactive', phone: null}, this.headers);
  }


  activeUser(id : string, phone: string){

    return this.http.put<User>(`${base_url}/user/active/${id}`, {status:'Active', phone}, this.headers);
  }



updateUserPassword(formdata: User, id : string){

  return this.http.put<User>(`${base_url}/user/password/${id}`, formdata, this.headers);
}


updateUserStatus(id : string, userEdit: string, status: string){
  return this.http.put<User>(`${base_url}/user/delete/${id}`, {status, userEdit}, this.headers);
}


updateVerificationCode(id: string){
  return this.http.put<User>(`${base_url}/user/verificationcode/${id}`, this.headers);
}


updateSignature(id: string, signature: string){
  return this.http.put<User>(`${base_url}/user/signature/${id}`,{signature}, this.headers);
}
// verificationCode(id : string ){
//   console.log(id);
//   const verificationCode= true;
//   return this.http.put<User>(`${base_url}/user/verificationcode/${id}}`,verificationCode, this.headers);
// }

updatePassword(token:string, password: string){
  console.log({token, password});
return this.http.put(`${base_url}/user/forgot/newpassword`, {password, token})
}

cargarheaders(token: string){
  return {
    headers:{
      'x-token': token
    }
  }
}


getUser(id: string){
  return this.http.get<User>(`${base_url}/user/${id}`, this.headers);
}

getUserOTP(id: string){

  return this.http.get<User>(`${base_url}/user/otp/${id}`, this.headers);
}

getAllUsers(){
  return this.http.get<User []>(`${base_url}/user`, this.headers);
}


logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('rol');
  localStorage.removeItem('companyID');
  this.router.navigateByUrl('/login');
}


getAllUserscompany(companyID: string){
  return this.http.get<User[]>(`${base_url}/user/company/${companyID}`, this.headers);
}

getAllUserscompanyStatus(companyID: string, status: string){
  return this.http.get<User[]>(`${base_url}/user/company/status/${companyID}/${status}`, this.headers);
}


getCompanyRol(companyID: string , rol: string){
  return this.http.get<User[]>(`${base_url}/user/company/${companyID}/${rol}`, this.headers);
}


getUserPosition(companyID: string , position: string){
  return this.http.get<User[]>(`${base_url}/user/position/${companyID}/${position}`, this.headers);
}

// getUserType(id: string){
//   return this.http.get<User[]>(`${base_url}/user/proveedor/${id}`, this.headers);
// }


// getClientes(id: string){
//   console.log(id);
//   return this.http.get<User []>(`${base_url}/user/clientes/${id}`, this.headers);
// }



deleteCertificate(userID: string, certificateID: string){

  return this.http.put<User[]>(`${base_url}/user/certificates/${userID}/${certificateID}`, this.headers);

}

deleteAttachments(userID: string, attachmentID: string){

  return this.http.put<User[]>(`${base_url}/user/attachments/${userID}/${attachmentID}`, this.headers);

}


}
