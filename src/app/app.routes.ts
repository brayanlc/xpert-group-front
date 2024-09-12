import { Routes } from '@angular/router';
import { CatDetailComponent } from './modules/cat/pages/cat-detail/cat-detail.component';
import { CatListComponent } from './modules/cat/pages/cat-list/cat-list.component';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { ContentLayoutComponent } from './modules/layout/content-layout/content-layout.component';
import { UserComponent } from './modules/user/user/user.component';
import { authGuard } from './guards/auth.guard';
import { FilterListComponent } from './modules/cat/pages/filter-list/filter-list.component';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'profile',
        component: UserComponent,
        canActivate: [authGuard],
      },
      { path: 'cats', component: CatListComponent },
      {
        path: 'cats/list',
        component: FilterListComponent,
      },
      {
        path: 'cats/:id',
        component: CatDetailComponent,
      },
    ],
  },
];
