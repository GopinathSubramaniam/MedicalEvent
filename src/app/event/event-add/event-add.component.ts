import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/util/constants';
import { Labels } from 'src/app/util/labels';
import { AppService } from '../../helpers/app.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit, OnDestroy {

  minStartDate: any = new Date();
  minEndDate: any = new Date();
  minRegCloseDate: any = new Date();

  eventId: string;
  eventForm: FormGroup;
  eventDetail: any = { organiser_detail: {} };
  submitted = false;
  paramSubscribe: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private app: AppService
  ) { }

  ngOnInit() {
    this.initValidation();
    this.paramSubscribe = this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      if (this.eventId) this.getEventDetail();
    });
  }

  ngOnDestroy(): void {
    this.paramSubscribe.unsubscribe();
  }

  initValidation() {
    this.eventForm = this.formBuilder.group({
      id: ['', []],
      OrganiserName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required]],
      username: ['', [Validators.required]],
      GSTIN: ['', [Validators.required]],
      PAN: ['', [Validators.required]],
      CIN: ['', [Validators.required]],
      CGST: ['', [Validators.required]],
      SGST: ['', [Validators.required]],
      URL: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      RegistrationCloseDate: ['', [Validators.required]],
      KitCount: ['', [Validators.required]],
      GuestCount: ['', [Validators.required]],
      Venue: ['', [Validators.required]],
      EarlyBirdDate: ['', [Validators.required]],
      EarlyBirdPrice: ['', [Validators.required]],
      PostEarlyBirdPrice: ['', [Validators.required]],
      CMEPoints: ['', [Validators.required]],
    });
  }

  get f() { return this.eventForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.eventForm.valid) {
      this.app.showSpinner();
      let formObj = this.eventForm.value;

      let user = {
        email: formObj.email,
        Name: formObj.OrganiserName,
        Phone: formObj.Phone,
        username: formObj.username,
        password: '123456',
        blocked: false,
        role: '5e33ddfa14194d03e8d90946',
        provider: 'local',
        confirmed: true
      };

      let organiserDetail = {
        GSTIN: formObj.GSTIN,
        PAN: formObj.PAN,
        CIN: formObj.CIN,
        CGST: formObj.CGST,
        SGST: formObj.SGST,
        URL: formObj.URL,
        Address: formObj.Address,
        user: ''
      };

      let eventDetail = {
        Name: formObj.Name,
        StartDate: Constants.formatDate(new Date(formObj.StartDate)),
        EndDate: Constants.formatDate(new Date(formObj.EndDate)),
        RegistrationCloseDate: Constants.formatDate(new Date(formObj.RegistrationCloseDate)),
        KitCount: formObj.KitCount,
        GuestCount: formObj.GuestCount,
        Venue: formObj.Venue,
        EarlyBirdDate: Constants.formatDate(new Date(formObj.EarlyBirdDate)),
        EarlyBirdPrice: formObj.EarlyBirdPrice,
        PostEarlyBirdPrice: formObj.PostEarlyBirdPrice,
        CMEPoints: formObj.CMEPoints,
        organiser_detail: '',
        BEventVideo: null,
        Lng: 1,
        Lat: 1,
        Publish: true
      };

      let obj = { user: user, organiserDetail: organiserDetail, eventDetail: eventDetail };

      let promise = null;
      if (this.eventId) {
        let ids = { eventId: this.eventDetail.id, userId: this.eventDetail.organiser_detail.user, organiserId: this.eventDetail.organiser_detail.id };
        obj.organiserDetail.user = ids.userId;
        obj.eventDetail.organiser_detail = ids.organiserId;

        promise = this.eventService.updateEvent(ids, obj);
      } else {
        promise = this.eventService.createEvent(obj);
      }

      promise.then((created) => {
        if (created) {
          this.onReset();
          this.app.hideSpinner();
          if (this.eventId) {
            this.app.showSuccessToast(Labels.SUCCESS.UPDATED);
            this.router.navigate(['/events']);
          } else {
            this.app.showSuccessToast(Labels.SUCCESS.ADDED);
          }
        } else {
          this.app.showErrorToast(Labels.PLZ_TRY_AGAIN);
        }
      });
    }
  }

  getEventDetail() {
    this.app.showSpinner();
    this.eventService.getEventDetail(this.eventId).then((res: any) => {
      let obj = res;
      obj.GSTIN = res.organiser_detail.GSTIN;
      obj.PAN = res.organiser_detail.PAN;
      obj.CIN = res.organiser_detail.CIN;
      obj.CGST = res.organiser_detail.CGST;
      obj.SGST = res.organiser_detail.SGST;
      obj.URL = res.organiser_detail.URL;
      obj.Address = res.organiser_detail.Address;
      this.eventDetail = obj;
      this.eventForm.patchValue(obj);
      this.app.hideSpinner();
    }).catch(err => {
      this.app.hideSpinner();
    });
  }

  onReset() {
    this.submitted = false;
    this.eventForm.reset();
  }

  onStartDateSelect(ev) {
    console.log(ev);
    this.minEndDate = this.eventForm.value.StartDate;
    this.minRegCloseDate = this.eventForm.value.StartDate;
    if (this.eventForm.value.StartDate > this.eventForm.value.EndDate) {
      this.eventForm.patchValue({ 'EndDate': this.minRegCloseDate });
    }
    if (this.eventForm.value.RegistrationCloseDate < this.eventForm.value.EndDate) {
      this.eventForm.patchValue({ 'RegistrationCloseDate': this.eventForm.value.EndDate });
    }
  }

  onEndDateSelect(ev) {
    console.log(ev);
    this.minRegCloseDate = this.eventForm.value.EndDate;
    if (this.eventForm.value.RegistrationCloseDate < this.eventForm.value.EndDate) {
      this.eventForm.patchValue({ 'RegistrationCloseDate': this.minRegCloseDate });
    }
  }

}
