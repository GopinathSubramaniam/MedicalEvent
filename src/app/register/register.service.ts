import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { RestService } from '../util/rest.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private rest: RestService) { }

  doRegister(data) {
    let url = Constants.getUrl(Constants.URL.REGISTER);
    return this.rest.post(url, data);
  }

  updateUser(id, data) {
    let url = Constants.getUrl(Constants.URL.USER) + '/' + id;
    return this.rest.put(url, data);
  }

}
