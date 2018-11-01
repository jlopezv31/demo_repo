import { LoginService } from './login.service';
import { TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    if (token != null) {
      let access_token = token.access_token;
      let rpta = this.loginService.estaLogeado;
      if (!rpta) {
        sessionStorage.clear();
        this.router.navigate(['login'])
        return false;
      } else {
          return true;
      }
    }
    else {
      sessionStorage.clear();
      this.router.navigate(['login'])
      return false;
    }
    
  }
}
