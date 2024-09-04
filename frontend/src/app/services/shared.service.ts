import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private jobFileID!: string;

  setjobFileID(constante: string) {
    this.jobFileID = constante;
  }

  getjobFileID() {
    return this.jobFileID;
  }
}
