import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CanActivateGuardService {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean{
    
    console.log(this.router.url);
    
    if(this.loginService.isAuthenticate()){
      return true
    }
    else{
      this.router.navigate(["login"]);
      return false
    }
  }
}
