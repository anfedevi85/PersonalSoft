import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShowDash]'
})
export class ShowDashDirective {
  constructor(private el: ElementRef) {}

  @Input() appShowDash!: string | undefined;

  ngOnInit() {
    if (!this.appShowDash || this.appShowDash.trim() === ''||  this.appShowDash.trim() === null ||  this.appShowDash.trim() === undefined) {
      this.el.nativeElement.textContent = '-';
    } else {
      this.el.nativeElement.textContent = this.appShowDash;
    }
  }
}
