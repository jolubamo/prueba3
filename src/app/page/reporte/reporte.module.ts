import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ReporteComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    MatButtonModule, MatIconModule
  ]
})
export class ReporteModule { }
