import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from '../../models/empleado.model';
import { SharedModule } from '../../shared/shared/shared.module';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento.model';

@Component({
  standalone: true,
  selector: 'app-empleado-form',
  imports: [SharedModule],
  providers: [DepartamentoService],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss'],
})
export class EmpleadoFormComponent implements OnInit {
  form!: FormGroup;
  esEditar = false;
  departamentos: Departamento[] = [];
  

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<EmpleadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado | null,
    
    private readonly departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.esEditar = !!this.data;

    this.form = this.fb.group({
      nombre: [this.data?.nombre ?? '', [Validators.required]],
      email: [this.data?.email ?? '', [Validators.required, Validators.email]],
      cargo: [this.data?.cargo ?? '', [Validators.required]],
      salario: [
        this.data?.salario ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      departamentoId: [
        this.data?.departamentoId ?? null,
        [Validators.required],
      ],
    });
     this.departamentoService.getAll().subscribe({
    next: (data) => (this.departamentos = data),
    error: (err) => console.error('Error cargando departamentos', err),
  });
  }

  guardar() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value); // Se devolverán los datos al componente padre
  }

  cancelar() {
    this.dialogRef.close();
  }
}
