import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../models/producto.model';
import { environment } from 'src/environments/environment';
const base_url= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient,
  ) { }

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

  cargarheaders(token: string){
    return {
      headers:{
        'x-token': token
      }
    }
  }


  addProducto(formdata: Producto){

    return this.http.post(`${base_url}/producto`, formdata, this.headers);
  }

  updateProducto(formdata: Producto, id : string){

    return this.http.put(`${base_url}/producto/${id}`, formdata, this.headers);
  }

  updateSubProducto(formdata: Producto, id : string){

    return this.http.put(`${base_url}/producto/subproducto/${id}`, {formdata}, this.headers);
  }

  deleteProducto(id : string, userEdit: string){
    const status = "Eliminado";
    return this.http.put(`${base_url}/producto/delete/${id}`, {status, userEdit}, this.headers);
  }


  EntregarProducto(id : string, userEdit: string){
    const status = "Entregado";
    return this.http.put(`${base_url}/producto/delete/${id}`, {status, userEdit}, this.headers);
  }



  cargarProducto(id: string){
    return this.http.get(`${base_url}/producto/${id}`, this.headers);
  }

  cargarAllProductos(){
    return this.http.get(`${base_url}/producto`, this.headers);
  }

  cargarProductosEmpresa(EmpresaID: string){
    return this.http.get(`${base_url}/producto/empresa/${EmpresaID}`, this.headers);
  }





}
