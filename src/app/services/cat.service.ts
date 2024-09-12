import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed, CatImage } from '../models/cat';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private readonly http: HttpClient = inject(HttpClient);

  public getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>('http://localhost:3000/api/breeds');
  }

  getBreedById(id: string): Observable<Breed> {
    return this.http.get<Breed>(`http://localhost:3000/api/breeds/${id}`);
  }

  public getCatImagesByBreedId(id: string): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(
      `http://localhost:3000/api/imagesbybreed/${id}`,
    );
  }
}
