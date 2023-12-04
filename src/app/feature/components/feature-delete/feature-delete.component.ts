import { CardAlertComponent } from '@components/card-alert/card-alert.component';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { PersonFacade } from '@data-access';

@Component({
  selector: 'app-feature-delete',
  standalone: true,
  imports: [CardAlertComponent],
  templateUrl: './feature-delete.component.html',
  styleUrl: './feature-delete.component.scss',
})
export class FeatureDeleteComponent {
  #facade = inject(PersonFacade);
  data = inject(DIALOG_DATA) as { id: number };

  dialog = inject(DialogRef);
  alertDialog = inject(Dialog);
  alertMessage = signal('Cadastro excluído com sucesso!');
  deleteError = this.#facade.deleteError;

  submit() {
    if (!this.data.id) return;
    this.#facade.delete(this.data.id).add(() => {
      if (this.deleteError()) this.alertMessage.set(this.deleteError()!);
      this.dialog.close();
      this.openAlertDialog();
    });
  }

  close() {
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
