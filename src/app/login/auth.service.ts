import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any;
  // authChange = new Subject<boolean>();

  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    // this.authChange.next(true);
    return this.http.post<any>('https://localhost:5001/api/account/login', {
      email,
      password,
    });
  }

  checkAuth() {
    if (localStorage.getItem('logged') == 'true') return true;
    else return false;
  }

  Logout() {
    localStorage.setItem('logged', 'false');
    // console.log(this.isAuth);
  }
  Login() {
    localStorage.setItem('logged', 'true');
    // console.log(this.isAuth);
  }
}
