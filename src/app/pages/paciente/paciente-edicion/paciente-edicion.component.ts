import { MatIconModule } from '@angular/material';
import { PacienteService } from './../../../service/paciente.service';
import { Paciente } from './../../../model/paciente';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  id:number;
  paciente:Paciente;
  form: FormGroup;
  edicion:boolean = false;

  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private router: Router) { 
    this.paciente = new Paciente();
    this.form = new FormGroup({
      "id" : new FormControl(0),
      "nombre" : new FormControl(''),
      "apellidos" : new FormControl(''),
      "dni" : new FormControl(''),
      "direccion" : new FormControl(''),
      "telefono" : new FormControl('')
    });
  }

  ngOnInit() {
    //me suscribo  a lo que viene  al url
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    if(this.edicion){
      this.pacienteService.getPacienteporId(this.id).subscribe(data =>{
        let id = data.id;
        let nombre = data.nombre;
        let apellidos = data.apellidos;
        let dni = data.dni;
        let direccion = data.direccion;
        let telefono = data.telefono;
        this.form = new FormGroup({
          "id" : new FormControl(id),
          "nombre" : new FormControl(nombre),
          "apellidos" : new FormControl(apellidos),
          "dni" : new FormControl(dni),
          "direccion" : new FormControl(direccion),
          "telefono" : new FormControl(telefono)
        });

      })
    }
  }

  operar(){
    this.paciente.id = this.form.value['id'];
    this.paciente.nombre = this.form.value['nombre'];
    this.paciente.apellidos = this.form.value['apellidos'];
    this.paciente.dni = this.form.value['dni'];
    this.paciente.direccion = this.form.value['direccion'];
    this.paciente.telefono = this.form.value['telefono'];

    if(this.edicion){
      this.pacienteService.modificar(this.paciente).subscribe(data =>{
        if(data === 1){
          this.pacienteService.getlistarPaciente(0,100).subscribe(pacientes =>{
            this.pacienteService.pacienteCambio.next(pacientes);
            this.pacienteService.mensaje.next('Se modifico');
            //Se llama al listado de pacientes, pero la data q llega se encapsula
            //en pacienteCambio
          })

        }else{
          this.pacienteService.mensaje.next('No se modifico');

        }});
    }else{
      //NEW
      this.pacienteService.registrar(this.paciente).subscribe(data =>{
        if(data === 1){
          this.pacienteService.getlistarPaciente(0,100).subscribe(pacientes =>{
            this.pacienteService.pacienteCambio.next(pacientes);
          this.pacienteService.mensaje.next('Se registro');
        })

        }else{
          this.pacienteService.mensaje.next('No se registro');
        }
      });

    }

    this.router.navigate(['paciente'])
  }

}
