import { inject, signal } from '@angular/core';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { Person } from '../entities';
import { PersonRepository } from '../infrastructure';
import { catchError, concatMap, shareReplay, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class PersonFacade {
  #person = signal<Person | null>(null);
  #persons = signal<Person[] | null>(null);

  #service = inject(PersonRepository);

  get personsList() {
    return this.#persons.asReadonly();
  }

  get person() {
    return this.#person.asReadonly();
  }

  personList$() {
    this.#persons.set(null);
    return this.#service.getAll().pipe(
      shareReplay(),
      tap((persons) => this.#persons.set(persons.results))
    );
  }

  person$(id: number) {
    return this.#service.getOne(id).pipe(
      shareReplay(),
      tap((person) => this.#person.set(person))
    );
  }

  #setCreateError = signal<string | null>(null);
  get createError() {
    return this.#setCreateError.asReadonly();
  }
  create(person: CreatePersonDto) {
    this.#setCreateError.set(null);
    return this.#service
      .create(person)
      .pipe(concatMap(() => this.personList$()))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.#setCreateError.set(error.error.message);
        },
      });
  }

  #setUpdateError = signal<string | null>(null);
  get updateError() {
    return this.#setUpdateError.asReadonly();
  }
  update(id: number, person: UpdatePersonDto) {
    this.#setUpdateError.set(null);
    return this.#service
      .update(id, person)
      .pipe(concatMap(() => this.personList$()))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.#setUpdateError.set(error.error.message);
        },
      });
  }

  #setDeleteError = signal<string | null>(null);
  get deleteError() {
    return this.#setDeleteError.asReadonly();
  }
  delete(id: number) {
    this.#setDeleteError.set(null);
    return this.#service
      .delete(id)
      .pipe(concatMap(() => this.personList$()))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.#setDeleteError.set(error.error.message);
        },
      });
  }
}
