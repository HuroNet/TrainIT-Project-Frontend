import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado.model';
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [SharedModule, MatSelectModule,MatOptionModule],
  providers: [EmpleadoService],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
})
export class EmpleadosComponent implements OnInit {
  empleados: Empleado[] = [];
  columnas: string[] = [
    'nombre',
    'email',
    'cargo',
    'salario',
    'departamento',
    'acciones',
  ];

  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly dialog: MatDialog,

    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.getAll().subscribe({
      next: (data) => (this.empleados = data),
      error: (err) => {
        console.error('Error al cargar empleados', err);
        this.snackBar.open('Error al cargar empleados', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
  editarEmpleado(empleado: Empleado): void {
    this.abrirFormulario(empleado);
  }

  eliminarEmpleado(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { mensaje: '¿Estás seguro de eliminar este empleado?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.empleadoService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Empleado eliminado', 'Cerrar', {
              duration: 3000,
            });
            this.cargarEmpleados();
          },
          error: () => {
            this.snackBar.open('Error al eliminar empleado', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
  abrirFormulario(empleado?: Empleado): void {
    const dialogRef = this.dialog.open(EmpleadoFormComponent, {
      width: '400px',
      data: empleado || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (empleado) {
          this.empleadoService.update(empleado.id, result).subscribe({
            next: () => {
              this.snackBar.open('Empleado actualizado', 'Cerrar', {
                duration: 3000,
              });
              this.cargarEmpleados();
            },
            error: () => {
              this.snackBar.open('Error al actualizar empleado', 'Cerrar', {
                duration: 3000,
              });
            },
          });
        } else {
          this.empleadoService.create(result).subscribe({
            next: () => {
              this.snackBar.open('Empleado creado', 'Cerrar', {
                duration: 3000,
              });
              this.cargarEmpleados();
            },
            error: () => {
              this.snackBar.open('Error al crear empleado', 'Cerrar', {
                duration: 3000,
              });
            },
          });
        }
      }
    });
  }
}
