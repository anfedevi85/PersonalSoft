import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSsnformat]'
})
export class SsnformatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let numeroFormateado = input.value.replace(/\D/g, '');
    numeroFormateado = numeroFormateado.substring(0, 9);
    numeroFormateado = numeroFormateado.replace(/(\d{3})(?=\d)/g, '$1 ');
    input.value = numeroFormateado;
  }
}
