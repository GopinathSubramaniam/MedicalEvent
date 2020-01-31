import { Injectable } from '@angular/core';
import { RestService } from '../util/rest.service';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private rest: RestService) { }


  authenticate(data){
    let url = Constants.getUrl(Constants.URL.LOGIN);
    return this.rest.post(url, data);
  }
  
}
