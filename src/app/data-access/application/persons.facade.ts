import { inject, signal } from '@angular/core';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';
import { Person } from '../entities';
import { PersonRepository } from '../infrastructure';
import { shareReplay, tap } from 'rxjs';

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
    return this.#service.create(person);
  }

  update(id: string, person: UpdatePersonDto) {
    return this.#service.update(id, person);
  }

  delete(id: string) {
    return this.#service.delete(id);
  }
}
