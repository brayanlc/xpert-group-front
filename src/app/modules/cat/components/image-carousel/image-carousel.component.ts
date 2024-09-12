import { Component, Input } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CatImage} from "../../../../models/cat";

@Component({
  selector: 'app-cat-image-carousel',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  @Input() images: CatImage[] = [];
  currentIndex: number = 0;

  previousImage() {
    this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : this.images.length - 1;
  }

  nextImage() {
    this.currentIndex =
      this.currentIndex < this.images.length - 1 ? this.currentIndex + 1 : 0;
  }
}
