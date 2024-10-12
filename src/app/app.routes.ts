import { Routes } from '@angular/router';
import { companyInfoResolver } from './pages/invoice-page/company-info.resolver';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./pages/products-page/products-page.component').then((c) => c.ProductsPageComponent),
  },
  {
    path: 'invoice',
    loadComponent: () => import('./pages/invoice-page/invoice-page.component').then((c) => c.InvoicePageComponent),
    resolve: { companyInfo: companyInfoResolver },
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
