import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../modelos/articulo';
import { API_URL } from "../herramientas/constantes";

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private articulos: Articulo[];
  private articulos$ = new BehaviorSubject(this.articulos);
  private status;
  private status$ = new BehaviorSubject(this.status);

  constructor(
    private http: HttpClient,
  ) {
  }
  
  listado() {
    this.http.get( API_URL ).toPromise().then((data: Articulo[]) => {
        this.articulos = data;
        this.articulos$.next(this.articulos);
      },
      (err: HttpErrorResponse) => {
        this.articulos = [];
        this.articulos$.next(this.articulos);
      });
      return this.articulos$;
  }

  eliminar(id: String) {
    this.http.delete( API_URL +  id ).toPromise().then(data => {
        this.status = 200;
        this.status$.next(this.status);
      },
      (err: HttpErrorResponse) => {
        this.status = err.status;
        this.status$.next(this.status);
      });;
    return this.status$;
  }
}
