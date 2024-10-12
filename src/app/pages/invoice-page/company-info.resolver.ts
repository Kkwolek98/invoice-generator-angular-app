import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../../interfaces/company-info.interface';
import { CompanyInfoService } from '../../services/company-info.service';

export const companyInfoResolver: ResolveFn<Observable<CompanyInfo>> = (route, state) => {
  const companyInfoService = inject(CompanyInfoService);
  return companyInfoService.fetchCompanyData();
};
