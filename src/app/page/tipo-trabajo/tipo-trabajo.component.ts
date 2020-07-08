import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TipoTrabajo } from 'src/app/model/TipoTrabajo';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TrabajoserviceService } from 'src/app/service/trabajoservice.service';

@Component({
  selector: 'app-tipo-trabajo',
  templateUrl: './tipo-trabajo.component.html',
  styleUrls: ['./tipo-trabajo.component.css']
})
export class TipoTrabajoComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['codigo', 'trabajo', 'editar'];
  dataSource = new MatTableDataSource<TipoTrabajo>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private trabajoservice: TrabajoserviceService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listar();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      codigo: new FormControl(''),
    })
  }


  listar() {
    this.trabajoservice.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource<TipoTrabajo>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }


  clickenviar(): void {
    let tipoTrabajo: TipoTrabajo = new TipoTrabajo;
    tipoTrabajo.nombre = this.form.get('nombre').value;
    tipoTrabajo.codigo = this.form.get('codigo').value;

    if (!this.editar) {
      this.ingresar(tipoTrabajo);
    } else {
      this.actualizar(tipoTrabajo);
    }
  }

  private ingresar(tipoTrabajo: TipoTrabajo) {
    this.trabajoservice.ingresar(tipoTrabajo).subscribe(data => {
      this.spinner.hide();
      this.listar();
      this.form.reset();
    }), err => this.mensajeError(err)
  }

  private actualizar(tipoTrabajo: TipoTrabajo) {
    this.trabajoservice.modificar(tipoTrabajo).subscribe(data => {
      this.spinner.hide();
      if (data.codigo == 1) {
        this.listar();
        this.form.reset();
        this.toastr.success(data.respuesta)

      } else {
        this.listar();
        this.toastr.warning(data.respuesta);
      }
    }), err => this.mensajeError(err)
  }


  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
  onEditarClick(element: TipoTrabajo) {
    this.editar = true;
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('codigo').setValue(element.codigo);
  }

  onCancelar(): void {
    this.form.reset();
    this.editar = false;
  }

  onEliminar(): void {

    this.spinner.show();

    this.trabajoservice.eliminar(this.form.get('codigo').value).subscribe(data => {

      this.spinner.hide();

      if (data.codigo == 1) {
        this.toastr.success(data.respuesta);
        this.form.reset();

        this.listar();
      } else {
        this.toastr.warning(data.respuesta);
      }
    }, err => this.mensajeError(err));
  }

}
