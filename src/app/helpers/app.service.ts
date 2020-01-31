import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { Labels } from '../util/labels';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private msgService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  showSuccessToast(msg) {
    this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: msg });
  }

  showWarnToast(msg) {
    this.msgService.add({ severity: 'warn', summary: Labels.WARN.TEXT, detail: msg });
  }
  
  showErrorToast(msg) {
    this.msgService.add({ severity: 'error', summary: Labels.ERROR.TEXT, detail: msg });
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

}
