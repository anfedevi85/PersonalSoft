import { Directive, ElementRef, HostListener } from '@angular/core';
import {  formatCurrency, getCurrencySymbol  } from '@angular/common';
@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input')
  onInput() {
    let value: string = this.el.nativeElement.value;
    value = value.replace(/[^0-9.]/g, ''); // Eliminar todos los caracteres no numéricos excepto el punto decimal
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Agregar comas para separar los miles

    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2); // Limitar a dos decimales
    }

    this.el.nativeElement.value = '$' + parts.join('.');
  }
}
