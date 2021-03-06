import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { RestService } from '../util/rest.service';



@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private rest: RestService) { }

  getQualificationList() {
    let url = Constants.getUrl(Constants.URL.QUAL);
    return this.rest.get(url);
  }

  getIDProofList() {
    let url = Constants.getUrl(Constants.URL.IDPROOF);
    return this.rest.get(url);
  }

  createQualification(data) {
    let url = Constants.getUrl(Constants.URL.QUAL);
    return this.rest.post(url, data);
  }

  updateQualification(data) {
    let url = Constants.getUrl(Constants.URL.QUAL);
    url += '/' + data.id;
    return this.rest.put(url, data);
  }

  deleteQualification(id) {
    let url = Constants.getUrl(Constants.URL.QUAL);
    url += '/' + id;
    return this.rest.delete(url);
  }

  createIdProof(data) {
    let url = Constants.getUrl(Constants.URL.IDPROOF);
    return this.rest.post(url, data);
  }

  updateIdProof(data) {
    let url = Constants.getUrl(Constants.URL.IDPROOF);
    url += '/' + data.id;
    return this.rest.put(url, data);
  }

  deleteIdProof(id) {
    let url = Constants.getUrl(Constants.URL.IDPROOF);
    url += '/' + id;
    return this.rest.delete(url);
  }

}
