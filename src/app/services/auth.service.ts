import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  login(username: string, password: string) {
    return this.http.post<User>('http://localhost:3000/api/login', {
      username,
      password,
    });
  }

  setUserInfo(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserInfo(): User | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  clearUserInfo() {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getUserInfo();
  }

  register(user: User) {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  logout() {
    this.clearUserInfo()
    this.router.navigate(['/auth/login']);
  }
}
