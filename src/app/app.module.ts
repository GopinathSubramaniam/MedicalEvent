import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from 'angular-admin-lte';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appConf } from './app.conf';
import { CoreModule } from './core/core.module';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { PrimengComponentModule } from './primeng-component/primeng-component.module';
import { SettingComponent } from './setting/setting.component';
import { HttpErrorInterceptor } from './util/http-error.interceptor';
import { RestService } from './util/rest.service';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { TabsModule } from 'angular-admin-lte';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule.forRoot(appConf),
    LoadingPageModule, MaterialBarModule,
    PrimengComponentModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TabsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SettingComponent,
    ErrorComponent,
    NewsletterComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }, RestService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
