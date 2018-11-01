import { TOKEN_NAME } from './../_shared/var.constant';
import { Paciente } from './../model/paciente';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class PacienteService {

  url:string =  `${HOST}/paciente`;
  //pacientes:Paciente [] = [];
  //Programcion Reactiva para que se cambie los cambios cada ves 
  //que de clic
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();
  
  constructor(private http: HttpClient) {
  }

  getlistarPaciente(p:number, s:number){
   console.log('entrando al servicio')
   let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
   return this.http.get<Paciente[]>(`${this.url}/listarPageable?page=${p}&size=${s}`,{
     headers : new HttpHeaders().set('Authorization',`bearer ${access_token}`).set('Content-Type','application-json')
   });
  }

  registrar(pac: Paciente){
    return this.http.post(`${this.url}/registrar`,pac);
  }

  modificar(pac: Paciente){
    return this.http.put(`${this.url}/update`,pac);
  }

  eliminar(pac: Paciente){
    return this.http.delete(`${this.url}/eliminar${pac.id}`);
  }

  getPacienteporId(id:number){
    return this.http.get<Paciente>(`${this.url}/listar/${id}`);
  }


}
