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

  /**
   * variable to store movies
   */
  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) { }


  /**
   * Once component mounts will run the getMovies function a return 
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * fetches data from all movies
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog showing genre and information about genre
   * @param genre 
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description
      }
    })
  }

  /**
   * 
   * @param synopsis Opens a dialog that gives a synopsis of the movie
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: "Description",
        content: synopsis
      }
    })
  }

  /**
   * Opens dialog that reveals information about the director
   * @param director 
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio
      }
    })
  }

  /**
   * Determines what movies are favorites
   * @param id 
   * @returns - returns whether the movie is a favorite
   */
  isFavorite(id: string): boolean {
    return this.fetchMovies.isFavoriteMovie(id)
  }

  /**
   * removes movie from favorites
   * @param id 
   */
  removeFavorite(id: string): void {
    this.fetchMovies.deleteFavoriteMovie(id).subscribe(() => {
      this.snackbar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * add a movie to favorites
   * @param id 
   */
  addFavorite(id: string): void {
    this.fetchMovies.addFavoriteMovie(id).subscribe(() => {
      this.snackbar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }

}
