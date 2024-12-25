import { FormGroup } from '@angular/forms';

// * Validador personalizado para campos requeridos
export const isRequired = (field: 'fullname' | 'email' | 'password', form: FormGroup) => {
  const control = form.get(field);

  return control && control.touched && control.hasError('required');
};

// * Validador personalizado para campos de tipo email
export const isEmail = (form: FormGroup) => {
  const control = form.get('email');

  return control && control.touched && control.hasError('email');
};
