import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/departamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private readonly apiUrl = 'http://localhost:3000/departamentos'; 

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Departamento[]> {
    const Departamentos = this.http.get<Departamento[]>(this.apiUrl);
    console.log("aquiooooooooo",Departamentos);
    return this.http.get<Departamento[]>(this.apiUrl);
  }
}