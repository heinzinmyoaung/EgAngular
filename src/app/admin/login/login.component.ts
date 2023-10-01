import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/login';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: Login = new Login();

  constructor(private _loginService: LoginService, private router: Router ){
  }
  loginHandler(){
    console.log(this.login)

    this._loginService.login(this.login).subscribe({
      next: (response)=>{
        if(response){ 
          // console.log(response)
          return this.router.navigateByUrl("/project")
        }
        return this.router.navigateByUrl("/login")
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }
}
