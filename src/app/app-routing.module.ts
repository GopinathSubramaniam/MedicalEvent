import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SettingComponent } from './setting/setting.component';
import { AuthGuardService } from './util/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'events',
    loadChildren: './event/event.module#EventModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'setting',
    component: SettingComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'newsletter',
    component: NewsletterComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {
      customLayout: true
    }
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule',
    data: {
      customLayout: true
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      customLayout: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
