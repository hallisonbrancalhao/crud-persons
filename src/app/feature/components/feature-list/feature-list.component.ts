import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonFacade } from '@data-access';
import { FeatureCreateComponent } from '@components/feature-create/feature-create.component';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule, FeatureCreateComponent],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent implements OnInit {
  #facade = inject(PersonFacade);
  persons = this.#facade.personsList;

  createCard = signal(false);
  alertCard = signal(false);

  @Input()
  set alert(value: boolean) {
    this.alertCard.set(value);
  }

  @Input()
  set card(value: boolean) {
    this.createCard.set(value);
  }

  ngOnInit() {
    this.#facade.personList$().subscribe();
  }

  handleCreate() {
    this.createCard.set(!this.createCard());
    if (this.alertCard()) this.alertCard.set(false);
  }
}
