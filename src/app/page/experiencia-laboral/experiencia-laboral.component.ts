import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExperienciaLaboral } from 'src/app/model/ExperienciaLaboral';
import { MatTableDataSource } from '@angular/material/table';
import { ExperiencialaboralService } from '../../service/experiencialaboral.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonaService } from 'src/app/service/persona.service';
import { Persona } from 'src/app/model/Persona';
import { TipoTrabajo } from 'src/app/model/TipoTrabajo';
import { TrabajoserviceService } from 'src/app/service/trabajoservice.service';
import { FormatofechaService } from 'src/app/service/formatofecha.service';
@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  form: FormGroup;
  variable: string = '';
  variable2: string = '';
  lstTitcodigo: TipoTrabajo[];
  lstPercodigo: Persona[];
  editar: boolean = false;

  displayedColumns: string[] = ['codigo', 'fechaInicio', 'fechaFin', 'perCodigo', 'titCodigo', 'editar'];
  dataSource = new MatTableDataSource<ExperienciaLaboral>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private fb: FormBuilder,
    private experienciaservice: ExperiencialaboralService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private per: PersonaService,
    private tit: TrabajoserviceService,
    private formatoFecha: FormatofechaService
  ) { }

  ngOnInit(): void {
    this.initform();
    this.listar();
    this.listarPerCodigo();
    this.listarTitCodigo();
  }
  private initform(): void {
    this.form = this.fb.group({
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      perCodigo: new FormControl('', Validators.required),
      titCodigo: new FormControl('', Validators.required),
      codigo: new FormControl('')
    });
  }
  clickenviar(): void {
    let exp: ExperienciaLaboral = new ExperienciaLaboral();
    exp.codigo = this.form.get('codigo').value;
    exp.fechaFin = this.form.get('fechaFin').value;
    exp.fechaInicio = this.form.get('fechaInicio').value;
    exp.perCodigo = this.form.get('perCodigo').value;
    exp.titCodigo = this.form.get('titCodigo').value;
    if (!this.editar) {
      this.crear(exp);
    }else{
      this.actualizar(exp);
    }
  }
  crear(exp: ExperienciaLaboral) {
    this.experienciaservice.ingresar(exp).subscribe(data => {
      this.spinner.hide();
      this.listar();
      this.form.reset();
    }), err => this.mensajeError(err)
  }

  private actualizar(exp: ExperienciaLaboral): void {
    this.experienciaservice.modificar(exp).subscribe(data => {
      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();
        this.editar=false;
        this.listar();
      } else {
        this.toastr.warning(data.respuesta);
      }
    }, err => this.mensajeError(err));
  }

  listar() {
    this.experienciaservice.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<ExperienciaLaboral>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }
  listarPerCodigo() {
    this.per.buscarTodo().subscribe(data => {
      this.lstPercodigo = data;
    })
  }
  listarTitCodigo() {
    this.tit.listar().subscribe(data => {
      this.lstTitcodigo = data;
    })
  }
  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
  onEditarClick(element: ExperienciaLaboral): void {
    this.editar = true;
    this.form.get('codigo').setValue(element.codigo);
    this.form.get('fechaFin').setValue(this.formatoFecha.stringTodate("" + element.fechaFin));
    this.form.get('fechaInicio').setValue(this.formatoFecha.stringTodate("" + element.fechaInicio));
    this.form.get('perCodigo').setValue(element.perCodigo);
    this.form.get('titCodigo').setValue(element.titCodigo);
  }

  onEliminar(): void {
    this.spinner.show();
    this.experienciaservice.eliminar(this.form.get('codigo').value).subscribe(data => {
      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();
        this.editar=false;
        this.listar();
      } else {
        this.toastr.warning(data.respuesta);
      }
    }, err => this.mensajeError(err));
  }
}

