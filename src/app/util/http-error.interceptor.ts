import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AppService } from '../helpers/app.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private app: AppService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.app.hideSpinner();
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `${error.message}`;
          }
          if (error.status == 401) {
            errorMessage = 'Unauthorized Error';
          } else if (error.status == 500) {
            errorMessage = 'Something went wrong. Please logout and login again';
          }
          if (error.status !== 400) {
            let obj = { code: error.status, msg: errorMessage };
            sessionStorage.setItem('errorObj', JSON.stringify(obj));
            this._router.navigate(['/error'], { replaceUrl: true });
            return throwError(errorMessage);
          } else {
            let msg = '';
            let messages = error.error.message;
            if (messages && messages[0]) {
              let errList: any = messages[0];
              errList.messages.forEach(item => {
                msg += ' ' + item.message;
              });
              this.app.showErrorToast(msg);
            }
            return throwError(error);
          }
        })
      )
  }

}