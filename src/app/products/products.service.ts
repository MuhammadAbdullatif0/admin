import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  photo: any;
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(' https://localhost:5001/api/admin').pipe(
      map((res) => {
        console.log(res.data);
        return res;
      })
    );
  }
  getOrders() {
    return this.http.get<any>('https://localhost:5001/api/Orders/all').pipe(
      map((res) => {
        return res;
        console.log('hello');
      })
    );
  }

  getOrder(id) {
    return this.http.get('https://localhost:5001/api/Orders/' + id).pipe(
      map((res) => {
        return res;
        console.log('hello');
      })
    );
  }

  updateProducts(id: any, product: any) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (product.imgUrl) {
      formData.append('imgUrl', product.imgUrl, product.imgUrl?.name);
    }

    return this.http.patch(
      'https://localhost:5001/api/products/' + id,
      formData
    );
  }

  AddProduct(product: any) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('ProductBrand', product.ProductBrand);
    formData.append('ProductType', product.ProductType);

    formData.append('imgUrl', product.imgUrl, product.imgUrl?.name);
    console.log(formData);

    return this.http.post('https://localhost:5001/api/products/', formData);
  }

  deleteProduct(id: any) {
    console.log(id);
    return this.http.delete('https://localhost:5001/api/products/' + id);
  }
  getProductx(id: any) {
    return this.http.get('https://localhost:5001/api/products/' + id);
  }
  
  // updateStatus(id: any, status: any) {
  //   console.log(status, id);

  //   return this.http.patch('http://localhost:3000/orders/' + id, status);
  // }
  // getUsers() {
  //   return this.http.get('http://localhost:3000/profile/all');
  // }
}
