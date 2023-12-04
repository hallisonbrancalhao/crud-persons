import { Routes } from '@angular/router';
import { PersonsComponent } from './components/persons/persons.component';
import { FeatureUpdateComponent } from '@components/feature-update/feature-update.component';

export const featureRoutes: Routes = [
  {
    path: '',
    component: PersonsComponent,
  },
];
