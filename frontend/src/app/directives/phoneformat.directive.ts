import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneformat]'
})
export class PhoneformatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Eliminar cualquier carácter que no sea un número
    const phoneNumber = value.replace(/\D/g, '');
    // Aplicar el formato adecuado
    let formattedPhone = '';
    if (phoneNumber.length > 0) {
      formattedPhone = '(' + phoneNumber.substring(0, 3);
    }
    if (phoneNumber.length > 3) {
      formattedPhone += ') ' + phoneNumber.substring(3, 6);
    }
    if (phoneNumber.length > 6) {
      formattedPhone += '-' + phoneNumber.substring(6, 10);
    }

    // Establecer el valor formateado en el elemento de entrada
    this.el.nativeElement.value = formattedPhone;
  }
}
