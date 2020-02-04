import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
import { Labels } from '../util/labels';
import { ConfirmationService } from 'primeng/api';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private msgService: MessageService,
    private spinner: NgxSpinnerService,
    private confirmService: ConfirmationService
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

  deleteConfirm() {
    return new Promise((resolve, reject) => {
      this.confirmService.confirm({
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        message: 'Are you sure that you want to delete this data ?',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

}
