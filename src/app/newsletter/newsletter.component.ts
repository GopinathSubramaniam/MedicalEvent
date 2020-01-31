import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Labels } from '../util/labels';
import { NewsletterService } from './newsletter.service';
import { AppService } from '../helpers/app.service';

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
    private app: AppService,
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
    this.app.showSpinner();
    this.newsletterService.getNewsletterList().then((res: any) => {
      this.app.hideSpinner();
      this.newsletterList = res;
    });
  }

  createNewletter() {
    this.submitted = true;
    console.log('Valid = ', this.newsletterForm.valid)
    if (this.newsletterForm.valid) {
      this.app.showSpinner();
      this.newsletterService.createNewsletter(this.newsletterForm.value, this.selectedFile).then((res: any) => {
        this.app.hideSpinner();
        this.app.showSuccessToast(Labels.SUCCESS.ADDED);
        this.resetNewsletterModal();
        this.getNewsletterList();
      });
    }
  }

  deleteNewsletter() {
    this.app.showSpinner();
    this.newsletterService.deleteNewsletter(this.selectedId).then((res: any) => {
      this.app.hideSpinner();
      this.app.showSuccessToast(Labels.SUCCESS.DELETED);
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
