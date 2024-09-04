import { Directive , ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

declare const google: any;
@Directive({
  selector: '[appAutofilladdress]'
})
export class AutofilladdressDirective implements OnInit{

  @Output() placeSelected = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.placeSelected.emit(place);
    });
  }
}
