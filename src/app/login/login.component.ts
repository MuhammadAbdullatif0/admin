import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { AccountService } from '../content/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private serve: AccountService, private router: Router) {}
  ngOnInit(): void {}

  login(x: NgForm) {
    const y = x.value;
    console.log(x.value);
    this.serve.login(x.value).subscribe(
      ()=>{
        this.router.navigateByUrl('/admin');
      },
      (error) => {
        console.log('بتنجان');
        // this.test();
      }
    );
  }
  // test() {
  //   if (!this.serve.checkAuth()) {
  //     Swal.fire('Login Failed', 'Your Email or password is incorrect', 'error');
  //   }
  // }
  logOut() {
    // this.serve.logOut().subscribe();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
