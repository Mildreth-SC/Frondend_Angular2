import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoServicio } from '../../servicios/empleado.servicios';
import { Empleado } from '../../empleado';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit {
  empleado: Empleado | null = null;
  cargando = true;
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID del empleado a editar:', id);
    if (id && !isNaN(id)) {
      this.cargarEmpleado(id);
    } else {
      alert('ID de empleado inválido');
      this.router.navigate(['/empleados']);
    }
  }

  cargarEmpleado(id: number): void {
    console.log('Cargando empleado con ID:', id);
    console.log('URL:', `http://127.0.0.1:8000/api/empleados/${id}/`);
    
    this.empleadoService.obtenerEmpleadoPorId(id)
      .pipe(timeout(10000))
      .subscribe({
        next: (datos) => {
          console.log('Datos recibidos:', datos);
          this.empleado = datos;
          this.cargando = false;
          this.cdr.detectChanges();
          console.log('Cargando cambiado a false y detectChanges ejecutado');
        },
        error: (error) => {
          console.error('Error completo al cargar empleado:', error);
          const errorMsg = error.name === 'TimeoutError' 
            ? 'Tiempo de espera agotado' 
            : `Error ${error.status || 'Sin conexión'}`;
          alert(`Error al cargar empleado: ${errorMsg}`);
          this.cargando = false;
          this.cdr.detectChanges();
          this.router.navigate(['/empleados']);
        },
        complete: () => {
          console.log('Observable completado');
        }
      });
  }

  actualizarEmpleado(): void {
    if (this.empleado) {
      this.empleadoService.editarEmpleado(this.empleado.idEmpleado, this.empleado).subscribe({
        next: () => {
          alert('Empleado actualizado exitosamente');
          this.router.navigate(['/empleados']);
        },
        error: (error) => {
          console.error('Error al actualizar empleado:', error);
          alert('Error al actualizar empleado');
        }
      });
    }
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }
}
