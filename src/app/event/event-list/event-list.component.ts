import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

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

  constructor(private eventService: EventService) { }

  ngOnInit() {
    /* this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'organiser', header: 'Organiser' },
      { field: 'startDate', header: 'Start Date' },
      { field: 'endDate', header: 'End Date' },
      { field: 'publish', header: 'Publish' }
    ]; */
   /*  this.events = [
      { name: 'Basic Event', organiser: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', publish: 'Sanga' },
      { name: 'Public Event', organiser: 'NexWare', startDate: '14-01-2020', endDate: '15-01-2020', publish: 'Yogesh' }
    ]; */
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

}
