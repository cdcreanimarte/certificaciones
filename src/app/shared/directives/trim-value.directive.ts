import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValue]'
})
export class TrimValueDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('blur')
  onBlurEvent() {
    this.ngControl.control?.setValue(this.ngControl?.control?.value?.trim(), {
      emitEvent: false,
    });
  }
}
