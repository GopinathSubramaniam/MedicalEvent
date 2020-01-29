import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Constants } from '../util/constants';



@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errObj: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    let obj = sessionStorage.getItem('errorObj');
    if (obj) {
      this.errObj = JSON.parse(obj);
    } else {
      this.errObj = { code: 500, msg: Constants.MSG.SOMETHING_WENT_WRONG };
    }
  }

  clearAndStartNewSession() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
