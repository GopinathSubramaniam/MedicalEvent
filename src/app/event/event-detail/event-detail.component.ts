import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/helpers/app.service';
import { Labels } from 'src/app/util/labels';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {


  eventId: string;
  eventDetail: any = { organiser_detail: {} };

  // Session variables #START
  sessionModalHeader: string = 'New Session';
  sessionFormSubmitted: boolean = false;
  sessionForm: FormGroup;
  sessionList: any[];
  // Session variabled #END

  freeCouponList: any[];
  eventUserList: any[];
  stallList: any[];
  ratingList: any[];

  paramSubscribe: Subscription;

  displayCreateSessionModal: boolean = false;
  displayCreateCouponModal: boolean = false;
  displayUploadFilesModal: boolean = false;
  displayCreateStallModal: boolean = false;
  displayCreateInteractiveModal: boolean = false;
  displayCouponListModal: boolean = false;
  displayQRCodeModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private app: AppService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.paramSubscribe = this.route.paramMap.subscribe(params => {
      console.log('Event Id = ', params.get('id'));
      this.eventId = params.get('id');
      this.getEventDetail();
    });
    this.getSessions();
    this.getFreeCouponList();
    this.getEventUserList();
    this.getStallList();
    this.getRatingList();
    this.initValidator();
  }

  ngOnDestroy(): void {
    if (this.paramSubscribe) {
      this.paramSubscribe.unsubscribe();
    }
  }

  initValidator() {
    this.sessionForm = this.formBuilder.group({
      id: ['', []],
      Title: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Fee: ['', [Validators.required]],
    });
  }

  get f() { return this.sessionForm.controls; }

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

  getEventDetail() {
    this.app.showSpinner();
    this.eventService.getEventDetail(this.eventId).then(res => {
      this.eventDetail = res;
      this.app.hideSpinner();
    }).catch(err => {
      this.app.hideSpinner();
    });
  }

  // Session events #START
  createSession() {
    this.sessionFormSubmitted = true;
    if (this.sessionForm.valid) {
      this.app.showSpinner();
      let obj = this.sessionForm.value;
      obj.organiser_detail = this.eventDetail.organiser_detail.id;
      this.eventService.createSession(obj).then((res) => {
        this.app.hideSpinner();
        if (obj.id) {
          this.app.showSuccessToast(Labels.SUCCESS.UPDATED);
        } else {
          this.app.showSuccessToast(Labels.SUCCESS.ADDED);
        }
        this.resetSessionForm();
        this.getSessions();
      }).catch(err => {
        this.app.hideSpinner();
      });
    }
  }

  getSessions() {
    this.eventService.getSessionList().then((res: any) => {
      this.sessionList = res;
    });
  }

  editSession(sessionId) {
    console.log('ID = ', sessionId);
    let sessObj = this.sessionList.filter((item) => {
      return item.id === sessionId;
    });
    if (sessObj && sessObj.length > 0) {
      this.sessionModalHeader = 'Edit Session';
      let data = sessObj[0];
      let stDte = new Date(this.datePipe.transform(data.StartDate, 'yyyy-MM-dd HH:mm'));
      let edDte = new Date(this.datePipe.transform(data.EndDate, 'yyyy-MM-dd HH:mm'));
      let obj = { id: data.id, StartDate: stDte, EndDate: edDte, Fee: data.Fee, Title: data.Title };
      this.sessionForm.patchValue(obj);
      this.displayCreateSessionModal = true;
    }
  }

  deleteSession(id) {
    this.app.deleteConfirm().then((val) => {
      if (val) {
        this.app.showSpinner();
        this.eventService.deleteSession(id).then((res) => {
          this.app.hideSpinner();
          this.app.showSuccessToast(Labels.SUCCESS.DELETED);
          this.getSessions();
        });
      }
    });
  }

  resetSessionForm() {
    this.displayCreateSessionModal = false;
    this.sessionForm.reset();
    this.sessionModalHeader = 'New Session';
  }

  // Session events #END




}
