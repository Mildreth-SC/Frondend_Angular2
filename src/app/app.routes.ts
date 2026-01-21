import { Routes } from '@angular/router';
import { Lista } from './empleados/lista/lista';
import { Agregar } from './empleados/agregar/agregar';
import { Editar } from './empleados/editar/editar';

export const routes: Routes = [
  { path: 'empleados', component: Lista },
  { path: 'empleados/agregar', component: Agregar },
  { path: 'empleados/editar/:id', component: Editar },
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }
];
