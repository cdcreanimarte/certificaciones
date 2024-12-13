import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-certificate-preview',
  imports: [CommonModule,  NgxMaskPipe],
  templateUrl: './certificate-preview.component.html',
  styleUrl: './certificate-preview.component.scss',
})
export class CertificatePreviewComponent {
  @ViewChild('certificateElement') certificateElement!: ElementRef;

  @Input() formData: any;
  @Input() currentDate: Date = new Date();
  @Input() yearSelected: Date = new Date();
  @Input() certificateCode: string = '';

   // Método para obtener el elemento nativo del certificado
   public getCertificateElement(): HTMLElement {
    return this.certificateElement.nativeElement;
  }
}
