import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { CommonModule } from '@angular/common';
import { PersonFacade } from '@data-access';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent implements OnInit {
  #facade = inject(PersonFacade);

  persons = this.#facade.personsList;

  ngOnInit(): void {
    this.#facade.personList$().subscribe();
  }
}
