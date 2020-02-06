import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { RestService } from '../util/rest.service';
import { RegisterService } from '../register/register.service';
import { AppService } from '../helpers/app.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private rest: RestService,
    private app: AppService,
    private regService: RegisterService
  ) { }

  createEvent(data) {
    return new Promise((resolve, reject) => {
      //Posting user detail
      this.regService.doRegister(data.user).then((resUser: any) => {
        console.log('resUser = ', resUser);
        let organiserDetailUrl = Constants.getUrl(Constants.URL.ORGANISER_DETAILS);
        //Posting organiser detail
        data.organiserDetail.user = resUser.user.id;
        this.rest.post(organiserDetailUrl, data.organiserDetail).then((orgRes: any) => {
          console.log('orgRes = ', orgRes);
          let eventUrl = Constants.getUrl(Constants.URL.EVENT);
          data.eventDetail.organiser_detail = orgRes.id;
          //Posting event detail
          this.rest.post(eventUrl, data.eventDetail).then((finalRes: any) => {
            console.log('finalRes = ', finalRes);
            resolve(true);
          }).then((err) => {
            resolve(false);
          });
        });
      });
    });
  }

  getEventList() {
    let url = Constants.getUrl(Constants.URL.EVENT);
    return this.rest.get(url);
  }

  getEventDetail(id) {
    let url = Constants.getUrl(Constants.URL.EVENT);
    url += '/' + id;
    return this.rest.get(url);
  }

  createSession(data: any) {
    let url = Constants.getUrl(Constants.URL.SESSION);
    if (data.id) {
      url += '/' + data.id;
      return this.rest.put(url, data);
    } else {
      return this.rest.post(url, data);
    }
  }

  getSessionList() {
    let url = Constants.getUrl(Constants.URL.SESSION);
    return this.rest.get(url);
  }

  deleteSession(id){
    let url = Constants.getUrl(Constants.URL.SESSION)+'/'+id;
    return this.rest.delete(url);
  }

}
