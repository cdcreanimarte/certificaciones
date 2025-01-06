import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  imports: [MaterialModule],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss'
})
export class ModalConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
