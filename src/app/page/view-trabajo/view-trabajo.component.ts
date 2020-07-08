import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {PeticionesService} from '../../service/peticiones.service';
import {TipoTrabajo} from '../../model/TipoTrabajo';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-trabajo',
  templateUrl: './view-trabajo.component.html',
  styleUrls: ['./view-trabajo.component.css'],
})
export class ViewTrabajoComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'trabajo', ];
  trabajo:TipoTrabajo[];
  dataSource = new MatTableDataSource<TipoTrabajo>(this.trabajo);  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



  constructor(
    private peticionesService: PeticionesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.peticionesService.getTrabajo().subscribe(data=>{
      this.trabajo=data;
    });
 

  }
}


