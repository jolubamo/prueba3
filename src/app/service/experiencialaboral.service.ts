import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ExperienciaLaboral } from '../model/ExperienciaLaboral';
import { RespuestaServidor } from '../model/respuesta-servidor';

@Injectable({
  providedIn: 'root'
})
export class ExperiencialaboralService {
  private url: string = `${environment.apiUrl}/experiencia-laboral`;

  constructor(private http: HttpClient) { }
  
  listar(): Observable<ExperienciaLaboral[]> {
    return this.http.get<ExperienciaLaboral[]>(`${this.url}/listar`);
  }

  ingresar(exp: ExperienciaLaboral): Observable<null> {
    return this.http.post<null>(`${this.url}/crear`, exp);
  }

  modificar(exp: ExperienciaLaboral):  Observable<RespuestaServidor>{
    return this.http.put<RespuestaServidor>(`${this.url}/update`, exp);
  }
  eliminar(codigo:number):Observable<RespuestaServidor>{
    return this.http.delete<RespuestaServidor>(`${this.url}/eliminar/${codigo}`);
  }
}
