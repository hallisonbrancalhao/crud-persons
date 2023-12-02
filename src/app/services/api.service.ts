import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  CreatePersonDto,
  Person,
  Results,
  UpdatePersonDto,
} from '@data-access';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #url = signal(environment.apiUrl);

  #person = signal<Person | null>(null);
  #persons = signal<Person[] | null>(null);

  get personsList() {
    return this.#persons.asReadonly();
  }

  get person() {
    return this.#person.asReadonly();
  }

  personList$(): Observable<Results<Person>> {
    this.#persons.set(null);
    return this.#http.get<Results<Person>>(this.#url()).pipe(
      shareReplay(),
      tap((persons) => this.#persons.set(persons.results))
    );
  }

  person$(id: number): Observable<Person> {
    return this.#http.get<Person>(`${this.#url()}/${id}`).pipe(
      shareReplay(),
      tap((person) => this.#person.set(person))
    );
  }

  create(person: CreatePersonDto) {
    return this.#http.post(this.#url(), person);
  }

  update(id: string, person: UpdatePersonDto) {
    return this.#http.patch(`${this.#url()}/${id}`, { person });
  }

  delete(id: string) {
    return this.#http.delete(`${this.#url()}/${id}`);
  }
}
