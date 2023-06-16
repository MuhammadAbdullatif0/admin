import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  products: any;
  orderInfo = [];
  users: any;
  
  totalSales = 0;
  constructor(
    private auth: AuthService,
    private router: Router,
    private product: ProductsService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    // this.getOrders();
    //this.getUser();
    // console.log(this.totalSales);

    // console.log(this.orderInfo);
  }
  // getUser() {
  //   this.product.getUsers().subscribe((res) => {
  //     this.users = res;
  //   });
  // }
  // getOrders() {
  //   this.product.getOrders().subscribe((res) => {
  //     this.orderInfo = res;
  //     this.orderInfo.map((item) => {
  //       this.totalSales += item.totalPrice;
  //     });
  //   });
  // }
  logout() {
    this.auth.Logout();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  getProducts() {
    this.product.getProducts().subscribe((res) => {
      this.products = res;
      console.log(res);
    });
  }
}
