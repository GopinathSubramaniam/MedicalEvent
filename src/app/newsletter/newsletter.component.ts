import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Labels } from '../util/labels';
import { NewsletterService } from './newsletter.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {
  submitted: boolean = false;
  selectedFile: any;
  newsletterForm: FormGroup;
  displayAddNewsletterModal: boolean = false;
  displayDeleteConfimModal: boolean = false;
  selectedId: string;

  newsletterList: any[];

  constructor(
    private formBuilder: FormBuilder,
    private newsletterService: NewsletterService,
    private msgService: MessageService,
    private ngxSpinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.newsletterForm = this.formBuilder.group({
      id: ['', []],
      Title: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.getNewsletterList();
  }

  resetNewsletterModal() {
    this.newsletterForm.reset();
    this.displayAddNewsletterModal = false;
    this.selectedId = '';
    this.submitted = false;
  }

  getNewsletterList() {
    this.ngxSpinner.show();
    this.newsletterService.getNewsletterList().then((res: any) => {
      this.ngxSpinner.hide();
      this.newsletterList = res;
    });
  }

  createNewletter() {
    this.submitted = true;
    console.log('Valid = ', this.newsletterForm.valid)
    if (this.newsletterForm.valid) {
      this.ngxSpinner.show();
      this.newsletterService.createNewsletter(this.newsletterForm.value, this.selectedFile).then((res: any) => {
        this.ngxSpinner.hide();
        this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: Labels.SUCCESS.ADDED });
        this.resetNewsletterModal();
        this.getNewsletterList();
      });
    }
  }

  deleteNewsletter() {
    this.ngxSpinner.show();
    this.newsletterService.deleteNewsletter(this.selectedId).then((res: any) => {
      this.ngxSpinner.hide();
      this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: Labels.SUCCESS.DELETED });
      this.displayDeleteConfimModal = false;
      this.resetNewsletterModal();
      this.getNewsletterList();
    });
  }

  onFileChange(ev) {
    this.selectedFile = ev.target.files[0];
  }

  get f() { return this.newsletterForm.controls; }

}
