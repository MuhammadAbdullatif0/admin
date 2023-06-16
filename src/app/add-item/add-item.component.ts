import { Component, Inject, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  id: any;
  product: any;
  imgUrl: any;
  selected: any = null;
 
  constructor(
    private prod: ProductsService,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) private idNew: any
  ) {}
  ngOnInit(): void {
    this.id = this.idNew.id;
    console.log(this.id);
  }

  onSelect(e: any) {
    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.selected = e.target.files[0];
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }
  }
  create(
    name: string,
    price: string,
    description: string,
    ProductBrand: string,
    ProductType: string
  ) {
    let product;
    if (this.selected) {
      product = { name, price, description,ProductBrand,ProductType ,imgUrl: this.selected };
      Swal.fire('Thank You....', 'Item add Successfully', 'success');

      this.selected = null;
    } else {
      product = { name, price, description, ProductBrand, ProductType };
      Swal.fire('Data is not completed', 'Please compelete data', 'error');
    }
    this.prod.AddProduct(product).subscribe((x) => {
      Swal.fire('Thank You....', 'Item add Successfully', 'success');
      // location.reload();
    });
    this.dialogRef.close();
  }
}
