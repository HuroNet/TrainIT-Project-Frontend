import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartamentoService } from '../../services/departamento.service';
import { SharedModule } from '../../shared/shared/shared.module';
import { Departamento } from '../../models/departamento.model';

@Component({
  standalone: true,
  selector: 'app-departamento-form',
  imports: [SharedModule],
  providers: [DepartamentoService],
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.scss'],
})
export class DepartamentoFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<DepartamentoFormComponent>,
    private readonly departamentoService: DepartamentoService,
    @Inject(MAT_DIALOG_DATA) public data: Departamento | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.data?.nombre ?? '', Validators.required],
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.departamentoService.crear(this.form.value).subscribe({
      next: (res) => this.dialogRef.close(true),
      error: (err) => console.error('Error al guardar departamento', err)
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}