import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../interfaces/company-info.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyInfoService {
  private http = inject(HttpClient);

  fetchCompanyData(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>('assets/company.json');
  }
}
