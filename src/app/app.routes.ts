import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'persons',
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
  {
    path: '',
    redirectTo: 'persons',
    pathMatch: 'full',
  },
];
