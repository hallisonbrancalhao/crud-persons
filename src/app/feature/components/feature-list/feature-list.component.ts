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
import { Person, PersonFacade, UpdatePersonDto } from '@data-access';
import { FeatureCreateComponent } from '@components/feature-create/feature-create.component';
import { RouterLink } from '@angular/router';
import { FeatureUpdateComponent } from '@components/feature-update/feature-update.component';
import { FeatureDeleteComponent } from '@components/feature-delete/feature-delete.component';

import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FeatureCreateComponent,
    RouterLink,
    FeatureUpdateComponent,
    FeatureDeleteComponent,
  ],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent implements OnInit {
  #facade = inject(PersonFacade);
  dialog = inject(Dialog);
  persons = this.#facade.personsList;

  person = signal<Partial<Person> | null>(null);

  createCard = signal(false);
  updateCard = signal(false);
  deleteCard = signal(false);

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
    const dialogRef = this.dialog.open(FeatureCreateComponent, {});

    dialogRef.closed.subscribe((result) => {});
  }

  handleUpdate(person: UpdatePersonDto) {
    this.person.set(person);
    this.updateCard.set(!this.updateCard());
    if (this.alertCard()) this.alertCard.set(false);
  }

  handleDelete(person: Person) {
    this.person.set(person);
    this.deleteCard.set(!this.deleteCard());
    if (this.alertCard()) this.alertCard.set(false);
  }
}
