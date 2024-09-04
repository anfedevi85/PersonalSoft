import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOtp]'
})
export class OtpDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remover cualquier carácter que no sea un número
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Limitar la longitud del valor a 6 dígitos
    if (numericValue.length > 6) {
      inputElement.value = numericValue.slice(0, 6);
    } else {
      inputElement.value = numericValue;
    }
  }
}
