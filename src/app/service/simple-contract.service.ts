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
    return this.http.get<SimpleContract[]>('https://app-test3.herokuapp.com/contract/all');
  }

  downloadPdfWithId(id: number): Observable<HttpResponse<Blob>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/pdf');
    return this.http.get('https://app-test3.herokuapp.com/contract/download/' + id, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  save(contract: SimpleContract): Observable<Object> {
    return this.http.post('https://app-test3.herokuapp.com/contract/save', contract);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete('https://app-test3.herokuapp.com/contract/delete/' + id);
  }
}
