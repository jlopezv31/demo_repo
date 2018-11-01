import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { TOKEN_NAME } from 'src/app/_shared/var.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string;
  contrasena:string;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  iniciarSesion(){
    this.loginService.login(this.usuario,this.contrasena).subscribe(data=>{
      console.log(this.usuario)
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);
        this.router.navigate(['paciente']);
      }
    });
  }

  cerrarSesion() {    
    sessionStorage.clear();
    this.router.navigate(['login']);
  }


}
