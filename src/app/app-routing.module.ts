import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { PersonaComponent } from './page/persona/persona.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { TipoTrabajoComponent } from './page/tipo-trabajo/tipo-trabajo.component';
import { ExperienciaLaboralComponent } from './page/experiencia-laboral/experiencia-laboral.component';
import { ViewPersonaComponent } from './page/view-persona/view-persona.component';
import { ViewTrabajoComponent } from './page/view-trabajo/view-trabajo.component';
import { ViewExperienciaLaboralComponent } from './page/view-experiencia-laboral/view-experiencia-laboral.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'persona',
    component: PersonaComponent
  },
  {
    path: '404-not-found',
    component: NotFoundComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'trabajo',
    component: TipoTrabajoComponent
  },
  {
    path: 'experiencia-laboral',
    component: ExperienciaLaboralComponent
  },
  {
    path:'view-experiencia-laboral',
    component: ViewExperienciaLaboralComponent
  },
  {
    path: 'view-persona',
    component: ViewPersonaComponent
  },
  {
    path:'view-trabajo',
    component:ViewTrabajoComponent
  },
  {
    path:'reporte',
    loadChildren:()=> import('./page/reporte/reporte.module').then(m=>m.ReporteModule)
  },
  {
    path: '**', redirectTo: '404-not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
