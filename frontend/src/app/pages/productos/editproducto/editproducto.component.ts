import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { FileUploadService } from '../../../services/file-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { environment } from '../../../../environments/environment';
const base_url = environment.base_url;


@Component({
  selector: 'app-editproducto',
  templateUrl: './editproducto.component.html',
  styleUrls: ['./editproducto.component.css']
})
export class EditproductoComponent implements OnInit {

  public productoID: string;
  public userID: string;
  public empresaID: string;
  public producto!: Producto
  public editProductoForm!: FormGroup

  public imgUrl: string =  `${base_url}/uploads/imagenes/empresas/noimage.png`;
  public imgTemp: any;
  public subirArchivo!: File;
  public fileName: string ='';
  public url : string= `${base_url}/uploads/imagenes/`;

  constructor(
    private productoService:ProductoService,
    private fileUploadService:FileUploadService,
    private router: Router,
    private fb : FormBuilder,
    private activatedRoute:ActivatedRoute
  ) {

    this.userID= localStorage.getItem('userID')|| '';
    this.empresaID= localStorage.getItem('companyID')||'';
    this.productoID= this.activatedRoute.snapshot.paramMap.get('id')||'';

   }

  ngOnInit(): void {
    this.productoService.cargarProducto(this.productoID)
    .subscribe(
      (res:any)=>{
        this.producto= res.producto;
        console.log(this.producto);
        this.formulario();
      }
    )
  }

  formulario(){
    this.editProductoForm= this.fb.group({
      name:[this.producto.name, Validators.required],
      code:[this.producto.code],
      clasificacion:[this.producto.clasificacion],
      type:[this.producto.type],
      description:[this.producto.description],
      empresa: [this.empresaID],
      userCreated:[this.userID]
    })
    }

    cambiarArchivo(event: any): void{

      if (event.target.files && event.target.files[0]){
        this.subirArchivo = event.target.files[0];
        console.log(this.subirArchivo);
        const reader = new FileReader();
        reader.onload = e => this.imgTemp =  reader.result;
        reader.readAsDataURL(this.subirArchivo);
      }
    }

  editProducto(){

    if (this.subirArchivo) {

      this.fileUploadService.archivo(this.subirArchivo, 'productos')
      .then(
        (res: any) => {
          console.log(res);
        const fileName= res;
        this.editProductoForm.value.imagePath = fileName;
        this.productoService.updateProducto(this.editProductoForm.value, this.producto._id||'')
        .subscribe( resp =>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto Actualizado',
            showConfirmButton: false,
            timer: 2000
          });
            this.router.navigateByUrl('pages/productos/new');
          },(err: any)=>{
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.error.errors,
            });
          }
        );
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });

    }else{
      this.productoService.updateProducto(this.editProductoForm.value ,this.productoID)
      .subscribe(
        (res:any)=>{
          Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto Actualizado',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl('pages/productos/new');
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

  }

  cancelar(){
    this.router.navigateByUrl('pages/productos/new');
  }

}
