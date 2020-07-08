import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {
  lstPais: Pais[] = [{ codigo: 57, nombre: 'Colombia' }, { codigo: 2, nombre: 'USA' }];
  constructor() { }
  ocultarSelect:boolean=true;
  variable: string = '';
  onocultarSelectClick(): void {
    console.log('funcion de ocultar Select');
    this.ocultarSelect = !this.ocultarSelect;
  }
  ngOnInit(): void {
  }

}
interface Pais {
  codigo: number;
  nombre: string;
}
