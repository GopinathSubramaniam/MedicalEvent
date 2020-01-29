import { Injectable } from '@angular/core';
import { Constants } from '../util/constants';
import { RestService } from '../util/rest.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {



  constructor(private rest: RestService) { }

  getNewsletterList() {
    let url = Constants.getUrl(Constants.TYPE.NEWSLETTER);
    return this.rest.get(url);
  }

  createNewsletter(data, file) {
    return new Promise((resolve, reject) => {
      this.rest.uploadFile(file).then((res: any) => {
        let url = Constants.getUrl(Constants.TYPE.NEWSLETTER);
        delete data.id;
        delete data.file;
        data.Image = res[0];
        this.rest.post(url, data).then(res => {
          resolve(res);
        });
      });
    });
  }

  deleteNewsletter(id) {
    let url = Constants.getUrl(Constants.TYPE.NEWSLETTER) + '/' + id;
    return this.rest.delete(url);
  }





}
