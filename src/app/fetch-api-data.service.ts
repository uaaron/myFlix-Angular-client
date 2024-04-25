import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix22-92d05c2f180f.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


  //User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  //Get all Movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    )
  }

  //Get One Movie
  getOneMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + title).pipe(
      catchError(this.handleError)
    )
  }

  //Get Director
  getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/' + directorName).pipe(
      catchError(this.handleError)
    )
  }

  //Get Genre
  getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/' + genreName).pipe(
      catchError(this.handleError)
    )
  }

  //Get User
  getUser(username: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + username).pipe(
      catchError(this.handleError)
    )
  }

  //Get Favorite Movies
  //The Api doesn't have an endpoint to retrieve favorite movies


  //add favorite movie
  addFavoriteMovie(username: string, movieID: number): Observable<any> {
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID).pipe(
      catchError(this.handleError)
    )
  }

  //Edit User
  editUser(updatedUser: string): Observable<any> {
    return this.http.put(apiUrl + 'users/' + updatedUser).pipe(
      catchError(this.handleError)
    )
  }

  //Delete User

  deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username).pipe(
      catchError(this.handleError)
    )
  }

  //Delete Favorie movie
  deleteFavoriteMovie(username: string, movieID: number): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username + 'movies/' + movieID).pipe(
      catchError(this.handleError)
    )
  }




  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
