import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchMovies: UserRegistrationService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
