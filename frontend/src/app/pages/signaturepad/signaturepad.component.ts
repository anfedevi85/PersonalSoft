import { Component,  ElementRef, VERSION, ViewChild, OnInit, Input } from '@angular/core';

import SignaturePad from "signature_pad";
import { AlertsService } from 'src/app/services/alerts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signaturepad',
  templateUrl: './signaturepad.component.html',
  styleUrls: ['./signaturepad.component.css']
})
export class SignaturepadComponent implements OnInit {
  name = "Angular " + VERSION.major;

  @Input() userID!: string;

  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  sig!: SignaturePad;

  constructor(private userService: UserService,
    private alert: AlertsService)
  {

  }

  ngOnInit() {
    this.sig = new SignaturePad(this.canvas.nativeElement);
  }

 async saveSignPad() {
    const base64ImageData = this.sig.toDataURL();
    // this.sig = base64ImageData;
    console.log(base64ImageData);
    this.userService.updateSignature(this.userID, base64ImageData)
    .subscribe(
    async  (res:any)=>{
      console.log(res);
     await this.alert.success('Signature Save');
     location.reload();
      }, (err:any)=>{
      console.log(err)

      }
    )
    console.log(this.userID);
    //Here you can save your signature image using your API call.
  }

  clear() {
    this.sig.clear();
  }
}
