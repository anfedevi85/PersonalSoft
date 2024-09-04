import { Component } from '@angular/core';
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent {

  files:any[]=[]

  onSelect(event: any){
    console.log(event);
    this.files.push(...event.addedFiles);

  }




  onRemove(event: any){
    this.files.splice(this.files.indexOf(event),1)

  }


}
