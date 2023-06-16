import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { UpdateItemComponent } from '../update-item/update-item.component';
import { ProductsService } from './products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit, OnInit {
  products = [];
  id: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private product: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.product.getProducts().subscribe((res) => {
      this.products = res.data;
      console.log(this.id);
      this.dataSource = new MatTableDataSource<any>(this.products);
      this.dataSource.paginator = this.paginator;
    });
  }
  filterValue = '';
  displayedColumns: string[] = ['title', 'img', 'desc', 'price', 'action'];

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  update() {
    const d = this.dialog.open(UpdateItemComponent, {
      data: {
        id: this.id,
      },
      height: '65%',
      width: '45%',
      panelClass: 'full-screen-modal',
    });
    d.afterClosed().subscribe((res) => {
      this.getProducts();
      console.log('Hello');
    });
  }
  Add() {
    const d = this.dialog.open(AddItemComponent, {
      data: {
        id: this.id,
      },
      height: '85%',
      width: '45%',
      panelClass: 'full-screen-modal',
    });
    d.afterClosed().subscribe((res) => {
      console.log('Hello');
      this.getProducts();
    });
  }
  delete(id: any) {
    Swal.fire({
      title: 'Do you Want to Delete this Item?',
      text: 'Are you Sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,Delete Item.',
      cancelButtonText: "No, Don't",
    }).then((res) => {
      if (res.value) {
        Swal.fire('Deleted', 'Your Data is Deleted', 'success');
        this.product.deleteProduct(id).subscribe({
          next: () => {
            console.log('Hello');

            this.getProducts();
          },
        });
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Failed to Delete item', 'error');
      }
    });
  }
}
