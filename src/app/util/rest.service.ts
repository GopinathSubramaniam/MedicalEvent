import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get(url) {
    let httpOptions = this.getHeaders();
    return this.http.get(url, httpOptions).toPromise();
  }

  post(url, data: any) {
    let httpOptions = this.getHeaders();
    return this.http.post(url, data, httpOptions).toPromise();
  }

  put(url, data: any) {
    let httpOptions = this.getHeaders();
    return this.http.put(url, data, httpOptions).toPromise();
  }

  delete(url) {
    let httpOptions = this.getHeaders();
    return this.http.delete(url, httpOptions).toPromise();
  }

  uploadFile(file) {
    let auth = 'bearer ' + sessionStorage.getItem('jwtToken');
    let headers = { headers: new HttpHeaders({ Authorization: auth }) };
    let url = Constants.getUrl(Constants.URL.FILE_UPLOAD);
    let formData = new FormData();
    formData.append('files', file);
    return this.http.post(url, formData, headers).toPromise();
  }


  getHeaders() {
    let obj = { 'Content-Type': 'application/json' };
    let jwtToken = sessionStorage.getItem('jwtToken');
    if (jwtToken) obj['Authorization'] = 'bearer ' + jwtToken;

    let head = new HttpHeaders(obj);
    return { headers: head };
  }
}
