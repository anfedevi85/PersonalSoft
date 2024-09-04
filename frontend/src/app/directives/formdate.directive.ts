import { Directive, ElementRef, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';


@Directive({
  selector: '[appFormdate]'
})
export class FormdateDirective  {

  constructor(private el: ElementRef,
              private datepicker: BsDatepickerDirective) { }

}
