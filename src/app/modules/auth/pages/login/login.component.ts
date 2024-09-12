import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Injects
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  // Form
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    this.authService
      .login(this.data.username as any, this.data.password as any)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.authService.setUserInfo(response);
          this.router.navigate(['/cats']);
        },
        (error) => {
          console.error('Login failed', error);
        },
      );
  }

  get data() {
    return this.loginForm.value;
  }
}
