import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const Key='Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXZhaW51c2UiLCJleHAiOjE2NDUyMTU4NDEsImlhdCI6MTY0NTE5Nzg0MX0.ycUm4MvtMgZ-Tl-W0R-8GMXTb4C6OjeKdcP7K_FM_OIR8bgbYMqrqpGIxblQnC3JOq4JOtt2kJvYNEv6gduJkA';
    return next.handle(request.clone(
      // httpHeaders.append('Authorization', "Bearer " + authorization);
      {
        setHeaders: {
          "Authorization": Key
        }
      }
    ));
  }
}
