import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmpleadoServicio } from '../../servicios/empleado.servicios';
import { Empleado } from '../../empleado';

@Component({
  selector: 'app-lista',
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit {
  empleados = signal<Empleado[]>([]);
  private empleadoService = inject(EmpleadoServicio);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (datos) => {
        this.empleados.set(datos);
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  editarEmpleado(id: number): void {
    this.router.navigate(['/empleados/editar', id]);
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Está seguro de eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => {
          alert('Empleado eliminado exitosamente');
          this.cargarEmpleados();
        },
        error: (error) => {
          console.error('Error al eliminar empleado:', error);
          alert('Error al eliminar empleado');
        }
      });
    }
  }
}
