import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeatureListComponent } from 'src/app/feature/components/feature-list/feature-list.component';

@Component({
  selector: 'app-persons',
  standalone: true,
  imports: [RouterOutlet, FeatureListComponent],
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss',
})
export class PersonsComponent {}
