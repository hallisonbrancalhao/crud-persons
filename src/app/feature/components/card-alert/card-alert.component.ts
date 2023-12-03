import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-card-alert',
  standalone: true,
  imports: [],
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
    this.showAlert.emit(false);
    this.toggleShowForm.emit(true);
  }
}
