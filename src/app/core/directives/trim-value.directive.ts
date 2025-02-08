import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValue]'
})
export class TrimValueDirective {
  constructor(private readonly ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\s/g, '');
    this.ngControl.control?.setValue(value, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur() {
    const value = this.ngControl?.control?.value;
    if (value) {
      this.ngControl.control?.setValue(value.trim(), { emitEvent: false });
    }
  }
}
