import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PersonFacade, PersonRepository } from '@data-access';
import { featureRoutes } from './feature.routes';

@NgModule({
  imports: [CommonModule, RouterOutlet, RouterModule.forChild(featureRoutes)],
  providers: [PersonFacade, PersonRepository],
})
export class FeatureModule {}
