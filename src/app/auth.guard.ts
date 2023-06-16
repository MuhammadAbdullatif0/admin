import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private serve: AuthService, private route: Router) {}
  canActivate() {
    if (!this.serve.checkAuth()) {
      this.route.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
