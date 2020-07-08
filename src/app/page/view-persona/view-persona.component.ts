import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from '../../service/persona.service';
import { Persona } from '../../model/Persona';

@Component({
  selector: 'app-view-persona',
  templateUrl: './view-persona.component.html',
  styleUrls: ['./view-persona.component.css']
})
export class ViewPersonaComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'identificacion', 'fechaNacimiento'];
  dataSource = new MatTableDataSource<Persona>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private personaService: PersonaService,
  ) { }

  ngOnInit(): void {
    this.buscarPersona();
    
  }
  private  buscarPersona():void{
    
    this.personaService.buscarTodo().subscribe(data => {
     this.dataSource = new MatTableDataSource<Persona>(data);
     this.paginator.firstPage();
     this.dataSource.paginator=this.paginator;
    });
  }
}

