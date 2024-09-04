import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  async actualizarFoto( archivo: File, tipo: 'user'|'companies', id: any ){

    try {
      const url = `${base_url}/file/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token')|| ''
        },
        body: formData
      });

      const data = await resp.json();
      if ( data.ok ) {
        return data.nombre;
      } else {
        console.error(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async archivo( archivo: File, tipo: string){

    console.log({archivo, tipo});
    try {
      const url = `${base_url}/file/${tipo}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      console.log(formData);

      const resp = await fetch(url, {
        method: 'POST',
        headers:{
          'x-token': localStorage.getItem('token')|| ''
        },
        body: formData
      });

      const data = await resp.json();
      if ( data.ok ) {
        console.log(data.nombre);
        return data.nombre;
      } else {
        console.error(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  sendPost(body : FormData, tipo: string): Observable<any>{
    const url = `${base_url}/file/upload/${tipo}`;
    return this.http.post(`${url}`, body)
  }
}
