import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Login } from './login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpClient: HttpClient | null = null

  constructor(private httpBackend: HttpBackend, private jwtHelperService: JwtHelperService) { }

  currentUserName: string = '';

  login(loginViewModel: Login): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);

    return this.httpClient.post<any>('http://localhost:5140/authenticate',loginViewModel, {responseType: 'json'})
    .pipe(map(user => {
      if(user){
        this.currentUserName = user.userName;
        localStorage.setItem("token", JSON.stringify(user.token));
        localStorage.setItem("refreshToken", JSON.stringify(user.refreshToken));
      }
      return user
    }))
  }

  public isAuthenticate(): Boolean {
    var token = this.jwtHelperService.tokenGetter();
    
    if(!token) return false; // Return false if no token is found

    if(this.jwtHelperService.isTokenExpired()){
      return false
    }
    else{
  
      return true
    }
  }

}
