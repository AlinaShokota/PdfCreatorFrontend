import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { SimpleContract } from '../model/simple-contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleContractService {

  constructor(private http: HttpClient) { }

  getAllContracts(): Observable<SimpleContract[]> {
    return this.http.get<SimpleContract[]>('http://localhost:8080/contract/all');
  }

  downloadPdfWithId(id: number): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get('http://localhost:8080/contract/download/' + id, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  save(contract: SimpleContract): Observable<Object> {
    return this.http.post('http://localhost:8080/contract/save', contract);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete('http://localhost:8080/contract/delete/' + id);
  }
}
