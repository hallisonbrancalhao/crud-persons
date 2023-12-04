import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-alert',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-alert.component.html',
  styleUrl: './card-alert.component.scss',
})
export class CardAlertComponent {
  title = signal('');
  @Output() showAlert = new EventEmitter<boolean>();
  @Output() toggleShowForm = new EventEmitter<boolean>();

  @Input({
    required: true,
  })
  set titleCard(value: string) {
    this.title.set(value);
  }

  close() {
    this.toggleShowForm.emit(false);
  }
}
