import { HttpClient } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Results } from '../interfaces';
import { Person } from '../entities';
import { CreatePersonDto, UpdatePersonDto } from '../dtos';

export class PersonRepository {
  #http = inject(HttpClient);
  #url = signal(environment.apiUrl);

  getAll() {
    return this.#http.get<Results<Person>>(this.#url());
  }

  getOne(id: number) {
    return this.#http.get<Person>(`${this.#url()}/${id}`);
  }

  create(person: CreatePersonDto) {
    return this.#http.post(this.#url(), { person });
  }

  update(id: string, person: UpdatePersonDto) {
    return this.#http.patch(`${this.#url()}/${id}`, { person });
  }

  delete(id: string) {
    return this.#http.delete(`${this.#url()}/${id}`);
  }
}
