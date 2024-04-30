import { Component, Input, OnInit } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = { _id?: string, UserName?: string, Password?: string, Email?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  user: User = {};

  @Input() userData = { UserName: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      UserName: user.UserName || "",
      Email: user.Email || "",
      Password: ""
    }

  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }

}
