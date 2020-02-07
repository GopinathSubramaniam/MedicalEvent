import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AppService } from 'src/app/helpers/app.service';
import { Labels } from 'src/app/util/labels';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  displayDialog: boolean;
  event: any = {};
  cols: any[];
  events: any[];

  constructor(
    private eventService: EventService,
    private app: AppService
  ) { }

  ngOnInit() {
    this.getEventList();
  }

  toggleDialog() {
    if (this.displayDialog) {
      this.displayDialog = false;
    } else {
      this.displayDialog = true;
    }
  }

  getEventList() {
    this.eventService.getEventList().then((res: any) => {
      console.log('getEventList = ', res);
      this.events = res;
    });
  }

  deleteEvent(id) {
    this.app.deleteConfirm().then(val => {
      if (val) {
        console.log('Delete Called. Id = ', id);
        let objs = this.events.filter((item) => {
          return item.id === id;
        });
        if (objs && objs.length > 0) {
          let obj = objs[0];
          this.eventService.deleteEvent(obj.id, obj.organiser_detail.id, obj.organiser_detail.user).then((res) => {
            this.app.showSuccessToast(Labels.SUCCESS.DELETED);
            this.getEventList();
          });
        }
      }
    });
  }

}
