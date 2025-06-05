export interface Empleado {
  id: number;
  nombre: string;
  email: string;
  cargo: string;
  salario: number;
  creadoEn: Date;
  departamentoId: number;
  departamento?: {
    id: number;
    nombre: string;
  };
}
