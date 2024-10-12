import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CompanyInfo } from '../../interfaces/company-info.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePageComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  companyInfo$ = this.route.data.pipe(map((data) => data['companyInfo'] as CompanyInfo));

  products = this.productsService.products;
  totalCount = this.products.map((product) => product.count).reduce((a, b) => a + b, 0);
  totalCost = this.products.map((product) => product.count * product.price).reduce((a, b) => a + b, 0);
}
