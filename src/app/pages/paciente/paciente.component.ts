import { Paciente } from './../../model/paciente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../../service/paciente.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  lista:Paciente[] = [];
  displayedColumns=['idPaciente','nombre','apellidos','dni','direccion','telefono','acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) matSort : MatSort;

  cantidad: number;
  constructor( private pacienteService:PacienteService, private snackbar: MatSnackBar) { }

  ngOnInit() { 
    this.pacienteService.getlistarPaciente(0, 100).subscribe(data => {
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });
    this.pacienteService.pacienteCambio.subscribe(data => {
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    });

    this.pacienteService.mensaje.subscribe(data => {
      this.snackbar.open(data,null,{duration:2000})
    });


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarMas(e){
    this.pacienteService.getlistarPaciente(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(pacientes);
    });
  }

  eliminar(paciente){
    this.pacienteService.eliminar(paciente)

  }

}
