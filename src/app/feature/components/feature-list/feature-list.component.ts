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
import { PersonFacade, UpdatePersonDto } from '@data-access';
import { FeatureCreateComponent } from '@components/feature-create/feature-create.component';
import { RouterLink } from '@angular/router';
import { FeatureUpdateComponent } from '@components/feature-update/feature-update.component';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [
    CommonModule,
    FeatureCreateComponent,
    RouterLink,
    FeatureUpdateComponent,
  ],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent implements OnInit {
  #facade = inject(PersonFacade);
  persons = this.#facade.personsList;

  person = signal<UpdatePersonDto | null>(null);

  createCard = signal(false);
  updateCard = signal(false);
  alertCard = signal(false);

  ngOnInit() {
    this.#facade.personList$().subscribe();
  }

  @Output() updatePerson = new EventEmitter<UpdatePersonDto>();

  @Input()
  set alert(value: boolean) {
    this.alertCard.set(value);
  }

  @Input()
  set create(value: boolean) {
    this.createCard.set(value);
  }

  @Input()
  set update(value: boolean) {
    this.updateCard.set(value);
  }

  handleCreate() {
    this.createCard.set(!this.createCard());
    if (this.alertCard()) this.alertCard.set(false);
  }

  handleUpdate(person: UpdatePersonDto) {
    this.person.set(person);
    this.updateCard.set(!this.updateCard());
    if (this.alertCard()) this.alertCard.set(false);
  }
}
