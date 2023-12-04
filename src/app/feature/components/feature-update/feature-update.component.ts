import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Person, PersonFacade, UpdatePersonDto } from '@data-access';
import { PersonForm } from '../../forms/create-person.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CardAlertComponent } from '@components/card-alert/card-alert.component';

@Component({
  selector: 'app-feature-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardAlertComponent],
  templateUrl: './feature-update.component.html',
  styleUrl: '../feature-create/feature-create.component.scss',
})
export class FeatureUpdateComponent implements OnInit {
  #facade = inject(PersonFacade);

  alertCard = signal(false);
  alertMessage = signal('Cadastro editado com sucesso!');
  updateError = this.#facade.updateError;

  toggleShowForm = signal(false);
  form = new PersonForm().form;
  person = signal<Partial<Person> | null>(null);

  @Input()
  set personUpdate(value: UpdatePersonDto | null) {
    if (!value) return;
    this.person.set(value);
  }

  @Output() showFormCard = new EventEmitter<boolean>();

  ngOnInit() {
    this.#assignPersonDataToForm();
  }

  @Input()
  set alert(value: boolean) {
    this.alertCard.set(value);
  }

  @Input()
  set formCard(value: boolean) {
    this.showFormCard.emit(value);
  }

  submit() {
    if (!this.form.valid || !this.person()?.id) return;
    this.#facade
      .update(this.person()?.id!, this.form.value as UpdatePersonDto)
      .add(() => {
        if (this.updateError()) this.alertMessage.set(this.updateError()!);
        this.alertCard.set(true);
      });
  }

  cancel() {
    this.toggleShowForm.set(false);
    this.showFormCard.emit(false);
  }

  #assignPersonDataToForm() {
    this.form.patchValue({
      name: this.person()?.name,
      email: this.person()?.email,
      phone: this.person()?.phone,
      birthDate: this.person()?.birthDate,
    });
  }

  handleAlertClose(value: boolean) {
    this.alertCard.set(value);
    this.showFormCard.emit(false);
  }
}
