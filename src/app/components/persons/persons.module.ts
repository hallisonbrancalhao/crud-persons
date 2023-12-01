import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { personsRoutes } from './persons.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterOutlet, RouterModule.forChild(personsRoutes)],
})
export class PersonsModule {}
