import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product-form.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public products: Product[] = [];
  public saveProducts(products: Product[]): void {
    this.products = products;
  }
}
