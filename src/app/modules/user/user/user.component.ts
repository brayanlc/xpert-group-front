import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Anytown, USA',
  };

  constructor() {}

  ngOnInit(): void {}
}
