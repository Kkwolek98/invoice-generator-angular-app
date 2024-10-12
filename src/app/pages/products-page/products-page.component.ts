import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductForm, ProductItemForm } from '../../interfaces/product-form.interface';
import { ProductsService } from '../../services/products.service';
import { ErrorComponent } from '../../shared/components/error/error.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private productsService = inject(ProductsService);

  public productsForm = this.fb.nonNullable.group<ProductForm>({
    products: this.fb.array([]) as unknown as FormArray<FormGroup<ProductItemForm>>, // as unknonw as... to make typed forms happy as from what I've deduced from requirements, I shouldn't start with a product added already
  });

  get productsFormArray(): FormArray {
    return this.productsForm.get('products') as FormArray;
  }

  addNewProduct(): void {
    this.productsFormArray.push(this.createNewProductFormGroup());
  }

  removeProductAt(index: number): void {
    this.productsFormArray.removeAt(index);
  }

  submitForm(): void {
    if (!this.productsFormArray.controls.length) {
      alert('Please add items'); // could be modal for better ux
    }

    if (this.productsForm.invalid) {
      this.productsFormArray.controls.forEach((control) => {
        control.markAsTouched(); // Mark group as touched
        Object.values((control as FormGroup).controls).forEach((control) => {
          control.markAsTouched(); // Mark all controls inside as touched to show errorrs
        });
      });
      return;
    }

    this.productsService.saveProducts(this.productsFormArray.value);
    this.router.navigate(['/invoice']);
  }

  private createNewProductFormGroup(): FormGroup<ProductItemForm> {
    return this.fb.group({
      name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      count: this.fb.nonNullable.control(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern('^[0-9]*$'),
      ]),
      price: this.fb.nonNullable.control(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
}
