import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardAlertComponent } from '@components/card-alert/card-alert.component';
import { PersonForm } from '../../forms/create-person.form';
import { CreatePersonDto, PersonFacade } from '@data-access';

import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardAlertComponent,
    DialogModule,
  ],
  templateUrl: './feature-create.component.html',
  styleUrl: './feature-create.component.scss',
})
export class FeatureCreateComponent {
  form = new PersonForm().form;
  #facade = inject(PersonFacade);

  dialog = inject(DialogRef);
  alertDialog = inject(Dialog);
  alertMessage = signal('Cadastro realizado com sucesso!');
  createError = this.#facade.createError;

  submit() {
    if (!this.form.valid) return;
    this.#facade.create(this.form.value as CreatePersonDto).add(() => {
      if (this.createError()) this.alertMessage.set(this.createError()!);
    });
    this.dialog.close();
    this.openAlertDialog();
  }

  cancel() {
    this.dialog.close();
  }

  openAlertDialog() {
    const dialogRef = this.alertDialog.open(CardAlertComponent, {
      data: {
        title: this.alertMessage(),
      },
    });
    dialogRef.closed.subscribe();
  }
}
