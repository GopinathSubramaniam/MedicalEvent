import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
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
          } else {
            errorMessage = 'Something went wrong. Please logout and login again';
          }
          let obj = {code: error.status, msg: errorMessage};
          sessionStorage.setItem('errorObj', JSON.stringify(obj));
          this._router.navigate(['/error'], { replaceUrl: true });
          return throwError(errorMessage);
        })
      )
  }

}