import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token?: string;

  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe({ next: (user) => (this.token = user?.token) });
    console.log(this.token);

    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlZmFAdGVmYS5jb20iLCJnaXZlbl9uYW1lIjoiTXVoYW1tYWQiLCJuYmYiOjE2ODY5MjE5NTIsImV4cCI6MTY4NzUyNjc1MiwiaWF0IjoxNjg2OTIxOTUyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIn0.ojyemximpt7XMQpsMYn9cZyvNkWyY8AEHMKbdPvrCI65LX7c6gkoLCM0DWXkGTk-whCF0l_c-saXqaVK1IgDtQ`,
      },
    });
    return next.handle(request);
  }
}
