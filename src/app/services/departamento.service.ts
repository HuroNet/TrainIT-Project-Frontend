import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private readonly apiUrl = 'https://trainit-project-backend.onrender.com/departamentos';


  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }
  crear(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }
}
