import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventListComponent } from './event-list/event-list.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [{
                        path: '',
                        component: EventListComponent
                      }, {
                        path: 'add',
                        component: EventAddComponent
                      },{
                        path: 'detail',
                        component: EventDetailComponent
                      }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
