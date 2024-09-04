import { Directive, ElementRef, HostListener  } from '@angular/core';

@Directive({
  selector: '[appCamelcase]'
})
export class CamelcaseDirective {



  constructor(private el: ElementRef) { }



  @HostListener('input')


  onInput() {


  const value: string = this.el.nativeElement.value;


  const transformedValue: string = value.replace(/\b\w/g, match => match.toUpperCase());


  this.el.nativeElement.value = transformedValue;
    }
  }
