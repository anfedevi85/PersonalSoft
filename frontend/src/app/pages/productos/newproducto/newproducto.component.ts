import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto.model';
import { Empresa } from 'src/app/models/empresa.model';
import { User } from 'src/app/models/user.model';
import { ProductoService } from '../../../services/producto.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { environment } from '../../../../environments/environment';
const base_url = environment.base_url;

import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-newproducto',
  templateUrl: './newproducto.component.html',
  styleUrls: ['./newproducto.component.css']
})
export class NewproductoComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any>= new Subject<any>();


  public producto! : Producto;
  public productos! : Producto[];
  public empresas: Empresa[]=[];
  public empresaID: string;
  public userID: string;
  public newProductoForm! : FormGroup
  public user! : User;


  public imgUrl: string ;
  public imgTemp: any;

  public url : string;

  constructor(
    private fb:FormBuilder,
    private fileuploadService:FileUploadService,
    private router: Router,
    private productoService: ProductoService
  ) {
    this.url= `${base_url}/uploads/imagenes/`;
    this.imgUrl=  `${base_url}/uploads/imagenes/empresas/noimage.png`;
    this.empresaID= localStorage.getItem('companyID')||'';
    this.userID= localStorage.getItem('userID')||'';
   }

  ngOnInit(): void {
    this.initForm();

      this.productoService.cargarAllProductos()
      .subscribe(
        (resp:any)=>{
          this.productos= resp.productos;
          console.log(this.productos);
          this.dtTrigger.next('');
        }
      )

      this.initTable();

  }


  initTable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json'
      },
      // dom:  '<"top"lf>rt<"bottom"ip><"clear">',
      dom:  "<'row'<'col-6'l><'col-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row '<'col-6'i><'col-6'p>>"+
      "<'row'<'col-sm-12 'B>>"
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


initForm(){
this.newProductoForm= this.fb.group({
  name:['', Validators.required],
  code:[''],
  clasificacion:[''],
  type:[''],
  description:[''],
  empresa: [this.empresaID],
  userCreated:[this.userID]
})
}



addProducto(){

  console.log(this.newProductoForm.value)
  this.productoService.addProducto(this.newProductoForm.value)
  .subscribe(
    resp =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El Producto Ha Sido Creado',
        showConfirmButton: false,
        timer: 1500

      })
      // this.router.navigateByUrl('pages/dashboard');
      location.reload();

    },(err: any)=>{
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.errors,
      });
    }
  );
  }




edit(producto: Producto){
  this.router.navigate(['pages/productos/edit/', producto._id])
}

delete(producto: Producto){
  Swal.fire({
    title: 'Esta Seguro?',
    text: "Eliminar Producto?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productoService.deleteProducto(producto._id|| '', this.userID)
 .subscribe(
  (res:any)=>{
    Swal.fire(
      'Eliminado!',
      'El Producto ha sido Eliminado.',
      'success'
    )
    window.location.reload();
    // this.reloadComponent();
  });
}
});
}


entregar(producto: Producto){
  Swal.fire({
    title: 'Esta Seguro?',
    text: "Entregar Producto?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Entregar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productoService.EntregarProducto(producto._id|| '', this.userID)
 .subscribe(
  (res:any)=>{
    Swal.fire(
      'Entregado!',
      'El Producto ha sido Entregado.',
      'success'
    )
    window.location.reload();
    // this.reloadComponent();
  });
}
});
}



}
