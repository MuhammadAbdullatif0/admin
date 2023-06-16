import { Component, OnInit } from '@angular/core';
// import { NotificationsService } from 'angular2-notifications';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  modeSelect: any;
  orderInfo = [];
  users: any;
  orders: any;
  select: any;
  selectedValue: any;
  constructor(
    private serve: ProductsService
  ) // private notify: NotificationsService
  {}
  ngOnInit(): void {
    this.orders = this.serve.getOrders().subscribe((res) => {
      this.orderInfo = res;
      this.selectedValue = res.status;

      console.log(res);
    });
    // this.serve.getUsers().subscribe((res) => {
    //   this.users = res;
    //   //console.log(this.users);
    // });
  }
  // Status(status, id) {
  //   console.log(status, id);

  //   this.serve.updateStatus(id, { status }).subscribe({
  //     next: (res) => {
  //       this.orders = this.serve.getOrders().subscribe((res) => {
  //         this.orderInfo = res;

  //         // console.log(res);
  //       });
  //       console.log(res);
  //     },
  //   });
  // }
}
