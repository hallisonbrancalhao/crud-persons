import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export class PersonForm {
  #fb = inject(FormBuilder);

  form = this.#fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    dataNascimento: ['', [Validators.required]],
  });
}
