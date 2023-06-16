import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent implements OnInit {
  id: any;
  product: any;
  imgUrl: any;
  selected: any = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) private idNew: any,
    private prod: ProductsService,
    public dialogRef: MatDialogRef<UpdateItemComponent>
  ) {}
  ngOnInit(): void {
    this.id = this.idNew.id;
    console.log(this.id);
    this.prod.getProductx(this.id).subscribe((res) => {
      this.product = res;
      console.log(this.product);
    });
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
  update(name: any, price: string, description: any) {
    let product;
    if (this.selected) {
      product = { name, price, description, imgUrl: this.selected };
      this.selected = null;
    } else {
      product = { name, price, description };
    }
    console.log(product);
    Swal.fire({
      title: 'Do you Want to update this data?',
      text: 'Is this data is Correct?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,Update Data.',
      cancelButtonText: "No, Don't",
    }).then((res) => {
      if (res.value) {
        Swal.fire('Update', 'Your Data is updated', 'success');
        this.prod.updateProducts(this.id, product).subscribe((x) => {});
        this.dialogRef.close();
        // location.reload();
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Failed to Update item', 'error');
        this.dialogRef.close();
      }
    });
  }
}
