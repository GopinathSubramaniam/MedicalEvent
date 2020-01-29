import { Injectable } from '@angular/core';
import { RestService } from '../util/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private rest: RestService) { }

}
