import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleado.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private readonly API_URL = 'https://trainit-project-backend.onrender.com/empleados';
   

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Empleado[]> {
    console.log('Fetching all empleados from API');
    const empleados = this.http.get<Empleado[]>(this.API_URL)
    console.log(empleados);
    return this.http.get<Empleado[]>(this.API_URL);
  }

  getById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.API_URL}/${id}`);
  }

  create(empleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.post<Empleado>(this.API_URL, empleado);
  }

  update(id: number, empleado: Partial<Empleado>): Observable<Empleado> {
    console.log(`Updating empleado with ID: ${id}`,empleado);
    return this.http.patch<Empleado>(`${this.API_URL}/${id}`, empleado);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
