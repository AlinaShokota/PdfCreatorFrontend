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
    return this.http.get<WebsitePriceDocument[]>('https://app-test3.herokuapp.com/website/all');
  }

  downloadPdfWithId(id: number): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get('https://app-test3.herokuapp.com/website/download/' + id, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  save(contract: WebsitePriceDocument): Observable<Object> {
    return this.http.post('https://app-test3.herokuapp.com/website/save', contract);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete('https://app-test3.herokuapp.com/website/delete/' + id);
  }
}
