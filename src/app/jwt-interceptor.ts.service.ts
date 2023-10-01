import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorTsService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = localStorage.getItem("token");

    if (token !== null) {
      console.log(token)
      token = JSON.parse(token)
    }
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
      return next.handle(req);
  }
}
