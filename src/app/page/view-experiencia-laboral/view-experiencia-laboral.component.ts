import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeticionesService } from 'src/app/service/peticiones.service';
import {ExperienciaLaboral} from '../../model/ExperienciaLaboral';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-experiencia-laboral',
  templateUrl: './view-experiencia-laboral.component.html',
  styleUrls: ['./view-experiencia-laboral.component.css']
})
export class ViewExperienciaLaboralComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'fechaInicio', 'fechaFin', 'perCodigo', 'titCodigo'];
  expl:ExperienciaLaboral[];
  dataSource = new MatTableDataSource<ExperienciaLaboral>(this.expl);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private peticionesService: PeticionesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.peticionesService.getExperienciaLaboral().subscribe(data=>{
      this.expl=data;
    });
  }

}