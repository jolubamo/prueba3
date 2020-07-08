import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../model/Persona';
import { PersonaService } from 'src/app/service/persona.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormatofechaService } from '../../service/formatofecha.service'

const moment = _moment;


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'identificacion', 'fechaNacimiento', 'editar'];
  dataSource = new MatTableDataSource<Persona>([]);


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private personaService: PersonaService,
    private formatoFecha: FormatofechaService,

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.buscarPersona();
  }
  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      codigo: new FormControl(''),
    })
  }


  clickenviar(): void {

    let persona: Persona = new Persona();
    this.spinner.show();
    persona.apellido = this.form.get('apellido').value;
    persona.nombre = this.form.get('nombre').value;
    persona.identificacion = this.form.get('identificacion').value;
    persona.fechaNacimiento = this.form.get('fechaNacimiento').value;
    persona.codigo = this.form.get('codigo').value;

    if (!this.editar) {

      this.registrar(persona);

    } else {

      this.actualizar(persona);

    }
  }
  private registrar(persona: Persona): void {
    this.personaService.crear(persona).subscribe(data => {

      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();

        this.buscarPersona();
      } else {
        this.toastr.warning(data.respuesta);
      }

    }, err => this.mensajeError(err));
  }
  private actualizar(persona: Persona): void {
    this.personaService.editar(persona).subscribe(data => {
      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();

        this.buscarPersona();
      } else {
        this.toastr.warning(data.respuesta);
      }
    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  private buscarPersona(): void {

    this.personaService.buscarTodo().subscribe(data => {
      this.dataSource = new MatTableDataSource<Persona>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  onEditarClick(element: Persona): void {
    this.editar = true;
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('apellido').setValue(element.apellido);
    this.form.get('fechaNacimiento').setValue(this.formatoFecha.stringTodate("" + element.fechaNacimiento));
    this.form.get('identificacion').setValue(element.identificacion);
    this.form.get('codigo').setValue(element.codigo);

  }

  onCancelar(): void {
    this.form.reset();
    this.editar = false;
  }

  onEliminar(): void {
    this.spinner.show();
    this.personaService.eliminar(this.form.get('codigo').value).subscribe(data => {
      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();
        this.editar=false;
        this.buscarPersona();
      } else {
        this.toastr.warning(data.respuesta);
      }
    }, err => this.mensajeError(err));
  }
}
