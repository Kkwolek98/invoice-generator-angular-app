import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Product {
  name: string;
  count: number;
  price: number;
}

export interface ProductItemForm {
  name: FormControl<string>;
  count: FormControl<number>;
  price: FormControl<number>;
}

export interface ProductForm {
  products: FormArray<FormGroup<ProductItemForm>>;
}
