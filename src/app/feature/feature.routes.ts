import { Routes } from '@angular/router';
import { PersonsComponent } from './components/persons/persons.component';

export const featureRoutes: Routes = [
  {
    path: '',
    component: PersonsComponent,
  },
];
