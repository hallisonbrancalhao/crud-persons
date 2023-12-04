import { Routes } from '@angular/router';
import { PersonsComponent } from './components/persons/persons.component';
import { FeatureUpdateComponent } from '@components/feature-update/feature-update.component';
import { FeatureListComponent } from '@components/feature-list/feature-list.component';

export const featureRoutes: Routes = [
  {
    path: '',
    component: FeatureListComponent,
  },
];
