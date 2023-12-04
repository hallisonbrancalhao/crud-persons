import { inject, signal } from '@angular/core';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { Person } from '../entities';
import { PersonRepository } from '../infrastructure';
import { catchError, shareReplay, tap } from 'rxjs';
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

  create(person: CreatePersonDto) {
    return this.#service.create(person).pipe(
      shareReplay(),
      catchError((err: HttpErrorResponse) => err.error.message)
    );
  }

  update(id: number, person: UpdatePersonDto) {
    return this.#service.update(id, person).pipe(
      shareReplay(),
      catchError((err: HttpErrorResponse) => err.error.message)
    );
  }

  delete(id: number) {
    return this.#service.delete(id).pipe(
      shareReplay(),
      catchError((err: HttpErrorResponse) => err.error.message)
    );
  }
}
