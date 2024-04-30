import { Component, OnInit } from '@angular/core';
import { FetchApiService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) { }

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

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description
      }
    })
  }

  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: "Description",
        content: synopsis
      }
    })
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio
      }
    })
  }

  isFavorite(id: string): boolean {
    return this.fetchMovies.isFavoriteMovie(id)
  }

  removeFavorite(id: string): void {
    this.fetchMovies.deleteFavoriteMovie(id).subscribe(() => {
      this.snackbar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  addFavorite(id: string): void {
    this.fetchMovies.addFavoriteMovie(id).subscribe(() => {
      this.snackbar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }

}
