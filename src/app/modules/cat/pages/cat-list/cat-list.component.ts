import { Component, inject, OnInit } from '@angular/core';
import { CatService } from '../../../../services/cat.service';
import { Breed, CatImage } from '../../../../models/cat';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ImageCarouselComponent } from '../../components/image-carousel/image-carousel.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-breed-selection-view',
  standalone: true,
  imports: [AsyncPipe, ImageCarouselComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatListComponent implements OnInit {
  public breeds: Breed[] = [];
  public breed: Breed | undefined;
  public catImage$: Observable<CatImage[]> = new Observable<CatImage[]>();

  // Form
  selectBreedForm = new FormControl('');

  // Injects
  private catService: CatService = inject(CatService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.getBreeds();
    this.selectBreedListener();
  }

  setFirstBreed() {
    this.breed = this.breeds[0];
    this.selectBreedForm.setValue(this.breeds[0].id);
  }

  setQueryParams() {
    this.route.queryParams.subscribe(({ breedId }) => {
      if (breedId) {
        this.selectBreedForm.setValue(breedId);
        this.filterBreeds(breedId);
      } else {
        this.setFirstBreed();
      }
    });
  }

  getBreeds() {
    this.catService.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
      this.setQueryParams();
    });
  }

  selectBreedListener() {
    this.selectBreedForm.valueChanges.subscribe((breedId) => {
      if (!breedId) {
        return;
      }
      this.navigateToBreed(breedId);
      this.catImage$ = this.catService.getCatImagesByBreedId(breedId);
      this.filterBreeds(breedId);
    });
  }

  filterBreeds(breedId: string) {
    this.breed = this.breeds.find((breed) => breed.id === breedId);
  }

  navigateToBreed(breedId: string) {
    this.router.navigate(['/cats'], {
      queryParams: { breedId },
      queryParamsHandling: 'merge',
    });
  }
}
