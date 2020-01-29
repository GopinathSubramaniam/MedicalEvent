import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimengComponentModule } from '../primeng-component/primeng-component.module';
import { GuestDetailComponent } from './guest/detail/detail.component';
import { GuestListComponent } from './guest/list/list.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [GuestListComponent, GuestDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimengComponentModule
  ]
})
export class UserModule { }
