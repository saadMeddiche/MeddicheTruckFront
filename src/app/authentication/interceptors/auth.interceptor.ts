import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TokenService} from "@app/authentication/services/token/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.get();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return handler.handle(request);
  }
}
