import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { isRequired, isEmail } from '../../../../shared/utils/validators';
import { ROUTES } from '../../../../shared/constant/routes';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  // * Injection
  private _fb = inject(FormBuilder);
  private _authSrv = inject(AuthService);
  private _router = inject(Router);

  // * Variables
  reactiveForm!: FormGroup;
  hidePassword = true;

  constructor(private dialogRef: MatDialogRef<SignInComponent>) {}

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false], // Nuevo control para el checkbox
    });
  }

  async onSubmit(): Promise<void> {
    if (this.reactiveForm.invalid) return;

    try {
      const { email, password } = this.reactiveForm.value;
      const { error } = await this._authSrv.signIn({ email, password });

      if (error) { throw error };

      this.dialogRef.close();
      this._router.navigateByUrl(`/administration/${ROUTES.DASHBOARD}`);
    } catch (error) {
      if(error instanceof Error){
        toast.error('Opps!, '+ error.message);
      }
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
}
