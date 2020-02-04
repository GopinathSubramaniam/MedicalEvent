import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventRoutingModule } from './event-routing.module';
import { PrimengComponentModule } from '../module/primeng-component.module';
import { EventAddComponent } from './event-add/event-add.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'angular-admin-lte';


@NgModule({
  declarations: [EventListComponent, EventAddComponent, EventDetailComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    PrimengComponentModule,
    ReactiveFormsModule,
    TabsModule
  ]
})
export class EventModule { }
