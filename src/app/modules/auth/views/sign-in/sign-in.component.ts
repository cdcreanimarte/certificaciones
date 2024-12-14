import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  hidePassword = true;

  constructor(
    private dialogRef: MatDialogRef<SignInComponent>
  ) {}

  ngOnInit(): void {
    // Aplicar el efecto de desenfoque al fondo
    const backdrop = document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
    if (backdrop) {
      backdrop.style.backdropFilter = 'blur(5px)';
    }
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}

