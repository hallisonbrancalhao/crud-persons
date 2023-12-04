import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureListComponent } from 'src/app/feature/components/feature-list/feature-list.component';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [RouterOutlet, FeatureListComponent],
  template: '<app-feature-list />',
})
export class PersonsComponent {}
