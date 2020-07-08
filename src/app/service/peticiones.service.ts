import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TipoTrabajo } from '../model/TipoTrabajo';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Persona } from '../model/Persona';
import { ExperienciaLaboral } from '../model/ExperienciaLaboral';


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http: HttpClient) {

  }
  url = 'http://localhost:8080/api/tipo-trabajo/listar';
  urlPer = 'http://localhost:8080/api/persona/listar';
  urlExp = 'http://localhost:8080/api/experiencia-laboral/listar';
  getTrabajo() {
    return this.http.get<TipoTrabajo[]>(this.url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
  getPersona() {
    return this.http.get<Persona[]>(this.urlPer).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
  getExperienciaLaboral() {
    return this.http.get<ExperienciaLaboral[]>(this.urlExp).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}