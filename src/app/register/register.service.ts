import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { RestService } from '../util/rest.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private rest: RestService) { }

  doRegister(data) {
    let url = Constants.getUrl(Constants.TYPE.REG);
    return this.rest.post(url, data);
  }

}
