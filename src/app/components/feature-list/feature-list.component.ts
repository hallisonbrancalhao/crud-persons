import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '@services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent implements OnInit {
  #api = inject(ApiService);

  persons = this.#api.personsList;

  ngOnInit(): void {
    this.#api.personList$().subscribe();
  }
}
