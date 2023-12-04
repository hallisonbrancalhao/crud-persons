import { Component, OnInit, inject, signal } from '@angular/core';
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
    RouterLink,
    CommonModule,
    DialogModule,
    FeatureCreateComponent,
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

  ngOnInit() {
    this.#facade.personList$().subscribe();
  }

  handleCreate() {
    const dialogRef = this.dialog.open(FeatureCreateComponent);
    dialogRef.closed.subscribe();
  }

  handleUpdate(person: UpdatePersonDto) {
    this.person.set(person);
    const dialogRef = this.dialog.open(FeatureUpdateComponent, {
      data: {
        person,
      },
    });
    dialogRef.closed.subscribe();
  }

  handleDelete(person: Person) {
    this.person.set(person);
    const dialogRef = this.dialog.open(FeatureDeleteComponent, {
      data: {
        id: person.id,
      },
    });
    dialogRef.closed.subscribe();
  }
}
