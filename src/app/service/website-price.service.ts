import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { WebsitePrice } from '../model/website-price';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsitePriceService {

  constructor(private http: HttpClient) { }

  getAllWebsitePriceDocuments(): Observable<WebsitePrice[]> {
    return this.http.get<WebsitePrice[]>('http://localhost:8080/website/all');
  }

  downloadPdfWithId(id: number): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get('http://localhost:8080/website/download/' + id, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  save(contract: WebsitePrice): Observable<Object> {
    return this.http.post('http://localhost:8080/website/save', contract);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete('http://localhost:8080/website/delete/' + id);
  }
}
