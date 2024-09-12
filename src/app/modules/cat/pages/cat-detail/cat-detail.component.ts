import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CatService } from '../../../../services/cat.service';
import { Breed } from '../../../../models/cat';
import { Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './cat-detail.component.html',
  styleUrl: './cat-detail.component.scss',
})
export class CatDetailComponent implements OnInit {
  breed$: Observable<Breed> = new Observable<Breed>();

  // Injects
  private catService: CatService = inject(CatService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.pipe().subscribe(({ id }) => {
      console.log(id);
      this.getBreedById(id);
    });
  }

  getBreedById(id: string) {
    this.breed$ = this.catService.getBreedById(id);
  }
}
