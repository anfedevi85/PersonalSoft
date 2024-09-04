import { Directive , ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPorcentageformat]'
})
export class PorcentageformatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos
    value = Math.min(100, parseInt(value, 10)).toString(); // Asegurarse de que el valor esté entre 1 y 100
    input.value = value + '%'; // Agregar el signo de porcentaje al final
  }
}
