import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTrabajo } from '../model/TipoTrabajo';
import { RespuestaServidor } from '../model/respuesta-servidor';
@Injectable({
  providedIn: 'root'
})
export class TrabajoserviceService {
  private url: string = `${environment.apiUrl}/tipo-trabajo`;

  constructor(
    private http: HttpClient
  ) { }

  listar(): Observable<TipoTrabajo[]> {
    return this.http.get<TipoTrabajo[]>(`${this.url}/listar`);
  }

  ingresar(tipoTrabajo: TipoTrabajo): Observable<null> {
    return this.http.post<null>(`${this.url}/crear`, tipoTrabajo);
  }

  modificar(tipoTrabajo: TipoTrabajo): Observable<RespuestaServidor> {
    return this.http.put<RespuestaServidor>(`${this.url}/update`, tipoTrabajo);
  }
  eliminar(codigo:number):Observable<RespuestaServidor>{
    return this.http.delete<RespuestaServidor>(`${this.url}/eliminar/${codigo}`);
  }
}
