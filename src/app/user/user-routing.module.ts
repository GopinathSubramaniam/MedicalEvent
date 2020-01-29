import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestDetailComponent } from './guest/detail/detail.component';
import { GuestListComponent } from './guest/list/list.component';

const routes: Routes = [{
                        path: 'guestList',
                        component: GuestListComponent
                      },
                      {
                        path: 'guestDetail',
                        component: GuestDetailComponent
                      }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
