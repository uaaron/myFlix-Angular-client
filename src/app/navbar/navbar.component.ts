import { Component } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiService,
    public router: Router
  ) { }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
