import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequesterService {
  constructor(private http: HttpClient) { }

  
  buildParams(parameters: any): HttpParams {
    let params = new HttpParams();
    for (const key in parameters) {
      if (parameters[key] != null) {
        params = params.set(key, parameters[key]);
      }
    }
    return params;
  }

  public get(apiNames: any, parameters: any): Observable<any> {
      const params = this.buildParams(parameters);
      return this.http.get(apiNames, { params });
    }

  post(url: string, body: any) {
    return this.http.post(url, body);
  }

    
}
