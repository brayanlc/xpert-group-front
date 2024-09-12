import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../../../services/cat.service';
import { Breed } from '../../../../models/cat';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cat-list-2',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './filter-list.component.html',
  styleUrl: './filter-list.component.scss',
})
export class FilterListComponent implements OnInit {
  public breeds: Breed[] = [];
  public breedsFiltered: Breed[] = [];
  public searchText: string = '';

  // Inject
  private catService: CatService = inject(CatService);

  ngOnInit(): void {
    this.getBreeds();
  }

  filterBreeds() {
    const search = this.searchText.toLowerCase();
    this.breedsFiltered = this.breeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(search) ||
        breed.origin.toLowerCase().includes(search) ||
        breed.temperament.toLowerCase().includes(search) ||
        breed.life_span.toLowerCase().includes(search),
    );
  }

  getBreeds() {
    this.catService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
      this.breedsFiltered = breeds;
    });
  }
}
