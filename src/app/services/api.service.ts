import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Country } from '@shared/country/country';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // API
  private REST_API: string = environment.end_point;
  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get all countries
  getAll() {
    return this.http.get<Country>(this.REST_API + 'all', { headers: this.httpHeaders });
  }

  // Get country by name
  getByName(event: string) {
    return this.http.get<Country>(this.REST_API + 'name/' + event, { headers: this.httpHeaders });
  }

  // Get country by full name
  getByFullName(event: string) {
    return this.http.get<Country>(this.REST_API + 'name/' + event + '?fullText=true', { headers: this.httpHeaders });
  }

  // Get country by code
  getByCode(event: string) {
    return this.http.get<Country>(this.REST_API + 'alpha/' + event, { headers: this.httpHeaders });
  }

  // Get country by code list
  getByCodeList(event: Array<string>) {
    return this.http.get<Country>(this.REST_API + 'alpha?codes=' + event.toString(), { headers: this.httpHeaders });
  }

  // Get country by currency
  getByCurrency(event: string) {
    return this.http.get<Country>(this.REST_API + 'currency/' + event, { headers: this.httpHeaders });
  }

  // Get country by language
  getByLanguage(event: string) {
    return this.http.get<Country>(this.REST_API + 'lang/' + event, { headers: this.httpHeaders });
  }

  // Get country by translation
  getByTranslation(event: string) {
    return this.http.get<Country>(this.REST_API + 'translation/' + event, { headers: this.httpHeaders });
  }

  // Get country by capital city
  getByCapital(event: string) {
    return this.http.get<Country>(this.REST_API + 'capital/' + event, { headers: this.httpHeaders });
  }

  // Get country by region
  getByRegion(event: string) {
    return this.http.get<Country>(this.REST_API + 'region/' + event, { headers: this.httpHeaders });
  }

  // Get country by subregion
  getBySubregion(event: string) {
    return this.http.get<Country>(this.REST_API + 'subregion/' + event, { headers: this.httpHeaders });
  }

  // Get country by demonym
  getByDemonym(event: string) {
    return this.http.get<Country>(this.REST_API + 'demonym/' + event, { headers: this.httpHeaders });
  }
}
