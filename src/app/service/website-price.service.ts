import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { WebsitePriceDocument } from '../model/website-price-document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsitePriceService {

  constructor(private http: HttpClient) { }

  getAllWebsitePriceDocuments(): Observable<WebsitePriceDocument[]> {
    return this.http.get<WebsitePriceDocument[]>('http://localhost:8080/website/all');
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

  save(contract: WebsitePriceDocument): Observable<Object> {
    return this.http.post('http://localhost:8080/website/save', contract);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete('http://localhost:8080/website/delete/' + id);
  }
}
