import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'persons',
    loadChildren: () =>
      import('./components/persons/persons.module').then(
        (m) => m.PersonsModule
      ),
  },
  {
    path: '',
    redirectTo: 'persons',
    pathMatch: 'full',
  },
];
