import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Person, Response } from '@shared/data-access';
import { Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient);
  #url = signal(environment.apiUrl);

  #persons = signal<Person[] | null>(null);
  get personsList() {
    return this.#persons.asReadonly();
  }

  personList$(): Observable<Response<Person>> {
    this.#persons.set(null);
    return this.#http.get<Response<Person>>(this.#url()).pipe(
      shareReplay(),
      tap((persons) => this.#persons.set(persons.results))
    );
  }
}
