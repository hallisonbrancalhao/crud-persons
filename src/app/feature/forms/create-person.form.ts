import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class PersonForm {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    birthDate: [new Date(), [Validators.required]],
  });
}
