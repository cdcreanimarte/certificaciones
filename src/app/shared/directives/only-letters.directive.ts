import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
 selector: '[appOnlyLetters]',
 standalone: true
})
export class OnlyLettersDirective {
 constructor(private el: ElementRef, private ngControl: NgControl) {}

 @HostListener('input', ['$event'])
 onInputChange(event: InputEvent) {
   const initialValue = this.el.nativeElement.value;
   const newValue = initialValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]*/g, '');
   this.el.nativeElement.value = newValue;
   this.ngControl.control?.setValue(newValue, { emitEvent: false });
   if (initialValue !== this.el.nativeElement.value) {
     event.stopPropagation();
   }
 }
}
