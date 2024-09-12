import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent {
  private authService: AuthService = inject(AuthService);

  public logout() {
    this.authService.logout();
  }
}
