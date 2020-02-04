import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/helpers/app.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  sessionList: any[];
  freeCouponList: any[];
  eventUserList: any[];
  stallList: any[];
  ratingList: any[];

  displayCreateSessionModal: boolean = false;
  displayCreateCouponModal: boolean = false;
  displayUploadFilesModal: boolean = false;
  displayCreateStallModal: boolean = false;
  displayCreateInteractiveModal: boolean = false;
  displayCouponListModal: boolean = false;
  displayQRCodeModal: boolean = false;

  constructor(private app: AppService) { }

  ngOnInit() {
    this.getSessions();
    this.getFreeCouponList();
    this.getEventUserList();
    this.getStallList();
    this.getRatingList();
  }

  getSessions() {
    this.sessionList = [
      { title: 'Sangameshwar', dateTimeRange: '01/07/2020 12:00 AM - 01/07/2020 11:59 PM', type: 'Free' },
      { title: 'Sangameshwar', dateTimeRange: '01/07/2020 12:00 AM - 01/07/2020 11:59 PM', type: 'Free' }
    ];
  }

  getFreeCouponList() {
    this.freeCouponList = [
      { title: 'Sangameshwar', purpose: 'Free entry for 2 people	', noOfCouponse: '10' },
      { title: 'Sangameshwar', purpose: 'Free entry for 2 people	', noOfCouponse: '10' }
    ];
  }

  getEventUserList() {
    this.eventUserList = [
      { name: 'Vascular Session', Organizer: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', paymentMode: 'CC' },
      { name: 'Health Session', Organizer: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', paymentMode: 'CC' },
      { name: 'Woundcare Session', Organizer: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', paymentMode: 'CASH' },
      { name: 'Development Session', Organizer: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', paymentMode: 'CC' },
      { name: 'Bodycheckup', Organizer: 'NexWare', startDate: '12-01-2020', endDate: '13-01-2020', paymentMode: 'CASH' }
    ];
  }

  getStallList() {
    this.stallList = [
      { stallName: 'Bite Moguls', ownerName: 'Yogesh', phone: '+91-9637752262', email: 'yogesh@gmail.com' },
      { stallName: 'Foodienator', ownerName: 'Foodienator', phone: '+91-9637752262', email: 'foodienator@gmail.com' },
      { stallName: 'Munch O Holics', ownerName: 'Munch', phone: '+91-9637752262', email: 'munch@gmail.com' },
      { stallName: 'Pan Frombies', ownerName: 'Frombies', phone: '+91-9637752262', email: 'frombies@gmail.com' }
    ];
  }

  getRatingList() {
    this.ratingList = [
      { user: 'Moguls', overAll: 4, topics: 4, speaker: 4, food: 4, desc: 'Good event. Lots of benefits' },
      { user: 'Bite', overAll: 4, topics: 4, speaker: 4, food: 4, desc: 'Good event. Lots of benefits' },
      { user: 'Amal', overAll: 4, topics: 4, speaker: 4, food: 4, desc: 'Good event. Lots of benefits' },
      { user: 'Peter', overAll: 4, topics: 4, speaker: 4, food: 4, desc: 'Good event. Lots of benefits' }
    ];
  }

  editSession() {
    this.app.deleteConfirm().then((val) => {
      console.log(val);
    });
  }

}
