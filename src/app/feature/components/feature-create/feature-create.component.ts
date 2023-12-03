import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardAlertComponent } from '@components/card-alert/card-alert.component';
import { PersonForm } from '../../forms/create-person.form';

@Component({
  selector: 'app-feature-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardAlertComponent],
  templateUrl: './feature-create.component.html',
  styleUrl: './feature-create.component.scss',
})
export class FeatureCreateComponent {
  alertCard = signal(false);
  toggleShowForm = signal(false);

  @Output() showFormCard = new EventEmitter<boolean>();

  @Input()
  set alert(value: boolean) {
    this.alertCard.set(value);
  }

  @Input()
  set formCard(value: boolean) {
    this.showFormCard.emit(value);
  }

  form = new PersonForm().form;

  submit() {
    if (!this.form.valid) return;
    this.alertCard.set(true);
  }

  cancel() {
    console.log('cancel');
    this.showFormCard.emit(false);
  }

  handleAlertClose(showList: boolean) {
    if (showList) {
      this.alertCard.set(false);
      this.showFormCard.emit(false);
    }
  }
}
