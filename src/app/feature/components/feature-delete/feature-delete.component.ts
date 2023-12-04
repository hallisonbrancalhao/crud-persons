import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CardAlertComponent } from '@components/card-alert/card-alert.component';
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
  #id = signal<number | null>(null);

  alertMessage = signal('Cadastro excluído com sucesso!');
  alertCard = signal(false);
  deleteError = this.#facade.deleteError;

  @Input()
  set id(value: number | undefined) {
    if (!value) return;
    this.#id.set(value);
  }

  @Input()
  set alert(value: boolean) {
    this.alertCard.set(value);
  }

  @Output() showFormCard = new EventEmitter<boolean>();
  @Output() showDelete = new EventEmitter<boolean>();
  @Output() toggleShowForm = new EventEmitter<boolean>();

  submit() {
    if (!this.#id()) return;
    this.#facade.delete(this.#id()!).add(() => {
      if (this.deleteError()) this.alertMessage.set(this.deleteError()!);
      this.alertCard.set(true);
    });
  }

  close() {
    this.showFormCard.emit(false);
  }

  handleAlertClose(value: boolean) {
    this.alertCard.set(value);
    this.showFormCard.emit(false);
  }
}
