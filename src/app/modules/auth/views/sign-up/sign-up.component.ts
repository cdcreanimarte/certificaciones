import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/material.module';
import { isEmail, isRequired } from '../../../../shared/utils/validators';
import { AuthService } from '../../services/auth.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  // * Injection
  private _fb = inject(FormBuilder);
  private _authSrv = inject(AuthService);
  private _router = inject(Router);

  // * Variables
  reactiveForm!: FormGroup;
  hidePassword = true;

  constructor(private dialogRef: MatDialogRef<SignUpComponent>) {}

  ngOnInit(): void {
    this.defocus();
    this.initForm();
  }

  defocus(): void {
    // Aplicar el efecto de desenfoque al fondo
    const backdrop = document.querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLElement;
    if (backdrop) {
      backdrop.style.backdropFilter = 'blur(5px)';
    }
  }

  initForm(): void {
    this.reactiveForm = this._fb.nonNullable.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkTerms: [false], // Nuevo control para el checkbox
    });
  }

  async onSubmit(): Promise<void> {
    if (this.reactiveForm.invalid) return;

    try {
      const { fullname, email, password } = this.reactiveForm.value;
      await this._authSrv.signUp({ email, password });
      this.onNoClick();
      toast.success('Registrado Exitoso!');
      this._router.navigateByUrl('/list');
      console.log(fullname, email, password);
    } catch (error) {
      toast.error('Error al registrarse');
      console.error(error);
    }
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  isRequired(field: 'fullname' | 'email' | 'password') {
    return isRequired(field, this.reactiveForm);
  }

  isEmail() {
    return isEmail(this.reactiveForm);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
