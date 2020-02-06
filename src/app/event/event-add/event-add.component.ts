import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { AppService } from '../../helpers/app.service';
import { Labels } from 'src/app/util/labels';
import { Constants } from 'src/app/util/constants';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  eventForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private app: AppService
  ) { }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
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
        StartDate: Constants.formatDate(formObj.StartDate),
        EndDate: Constants.formatDate(formObj.EndDate),
        RegistrationCloseDate: Constants.formatDate(formObj.RegistrationCloseDate),
        KitCount: formObj.KitCount,
        GuestCount: formObj.GuestCount,
        Venue: formObj.Venue,
        EarlyBirdDate: Constants.formatDate(formObj.EarlyBirdDate),
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

      this.eventService.createEvent(obj).then((created) => {
        if (created) {
          this.onReset();
          this.app.hideSpinner();
          this.app.showSuccessToast(Labels.SUCCESS.ADDED);
        } else {
          this.app.showErrorToast(Labels.PLZ_TRY_AGAIN);
        }
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.eventForm.reset();
  }

}
