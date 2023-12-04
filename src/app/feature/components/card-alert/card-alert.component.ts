import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-card-alert',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './card-alert.component.html',
  styleUrl: './card-alert.component.scss',
})
export class CardAlertComponent {
  data = inject(DIALOG_DATA) as { title: string };
  dialog = inject(DialogRef);

  close() {
    this.dialog.close();
  }
}
