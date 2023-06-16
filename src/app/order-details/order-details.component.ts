import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderData: any;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private order: ProductsService) {}
  ngOnInit(): void {
    this.order.getOrder(this.id).subscribe((res) => {
      this.orderData = res;
      console.log(res);
    });
  }
}
