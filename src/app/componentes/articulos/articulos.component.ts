import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ArticulosService } from '../../servicios/articulos.service';
import { Articulo } from '../../modelos/articulo';
import * as moment from "moment";

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  
  public articulos: Articulo[] = [];
  private subs: Subscription[] = [];
  public displayedColumns: string[];

  constructor(
  	private articulosServices: ArticulosService,
  ) { 
    this.displayedColumns = ['title', 'author', 'created_at', 'action'];
  	this.subs.push(this.articulosServices.listado().subscribe((values: Articulo[]) => {
      if (values) {
        this.articulos = values;
      }
    }));
  }

  ngOnInit() { }

  delete(id: string) {
    alert("Eliminado articulo");
    this.articulosServices.eliminar(id).subscribe((status) => {
      if (status) {
        switch (status) {
          case 200:
            this.subs.push(this.articulosServices.listado().subscribe((values: Articulo[]) => {
              if (values) {
                this.articulos = values;
              }
            }));
            break;
          case 403:
            alert("Error al eliminar el articulo");
            break;
        }
      }
    });
  }

}
