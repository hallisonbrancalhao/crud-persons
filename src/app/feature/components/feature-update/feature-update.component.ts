import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Person, PersonFacade, UpdatePersonDto } from '@data-access';
import { PersonForm } from '../../forms/create-person.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CardAlertComponent } from '@components/card-alert/card-alert.component';
import {
  DIALOG_DATA,
  Dialog,
  DialogModule,
  DialogRef,
} from '@angular/cdk/dialog';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardAlertComponent,
    DialogModule,
  ],
  templateUrl: './feature-update.component.html',
  styleUrl: '../feature-create/feature-create.component.scss',
})
export class FeatureUpdateComponent implements OnInit {
  form = new PersonForm().form;
  #facade = inject(PersonFacade);

  dialog = inject(DialogRef);
  alertDialog = inject(Dialog);
  alertMessage = signal('Cadastro editado com sucesso!');
  updateError = this.#facade.updateError;

  data = inject(DIALOG_DATA) as { person: Person };

  ngOnInit() {
    this.#assignPersonDataToForm();
  }

  submit() {
    if (!this.form.valid || !this.data.person.id) return;
    this.#facade
      .update(this.data.person.id, this.form.value as UpdatePersonDto)
      .add(() => {
        if (this.updateError()) this.alertMessage.set(this.updateError()!);
        this.dialog.close();
        this.openAlertDialog();
      });
  }

  cancel() {
    this.dialog.close();
  }

  #assignPersonDataToForm() {
    this.form.patchValue({
      name: this.data.person.name,
      email: this.data.person.email,
      phone: this.data.person.phone,
      birthDate: this.data.person.birthDate,
    });
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
