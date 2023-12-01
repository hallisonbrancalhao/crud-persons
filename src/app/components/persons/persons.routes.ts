import { Routes } from '@angular/router';
import { PersonsComponent } from './persons.component';
import { FeatureListComponent } from '../feature-list/feature-list.component';

export const personsRoutes: Routes = [
  {
    path: '',
    component: PersonsComponent,
    // children: [
    //   {
    //     path: 'list',
    //     component: FeatureListComponent,
    //   },
    // ],
  },
  // {
  //   path: '',
  //   redirectTo: 'list',
  //   pathMatch: 'full',
  // },
];
