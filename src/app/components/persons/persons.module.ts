import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { personsRoutes } from './persons.routes';
import { PersonFacade, PersonRepository } from '@data-access';

@NgModule({
  imports: [CommonModule, RouterOutlet, RouterModule.forChild(personsRoutes)],
  providers: [PersonFacade, PersonRepository],
})
export class PersonsModule {}
