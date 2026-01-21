import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoServicio } from '../../servicios/empleado.servicios';
import { Empleado } from '../../empleado';

@Component({
  selector: 'app-agregar',
  imports: [FormsModule],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar {
  empleado: Empleado = {
    idEmpleado: 0,
    nombre: '',
    departamento: '',
    sueldo: 0
  };

  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);

  guardarEmpleado(): void {
    this.empleadoService.agregarEmpleado(this.empleado).subscribe({
      next: () => {
        alert('Empleado agregado exitosamente');
        this.router.navigate(['/empleados']);
      },
      error: (error) => {
        console.error('Error al agregar empleado:', error);
        alert('Error al agregar empleado');
      }
    });
  }

  volver(): void {
    this.router.navigate(['/empleados']);
  }
}
