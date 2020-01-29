import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Labels } from '../util/labels';
import { SettingService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  qSubmitted: boolean = false;
  idSubmitted: boolean = false;
  qualificationForm: FormGroup;
  idproofForm: FormGroup;

  qualificationList: any[];
  idproofList: any[];
  displayQualiDialog: boolean = false;
  displayIDProofDialog: boolean = false;
  displayDeleteConfimModal: boolean = false;

  currPage: string = 'QUALI';

  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    private msgService: MessageService
  ) { }

  ngOnInit() {
    this.getValidation();
    this.getData();
  }

  getData() {
    this.getQualiList();
    this.getIDProofList();
  }

  getQualiList() {
    this.settingService.getQualificationList().then((res: any) => {
      this.qualificationList = res;
    });
  }

  getIDProofList() {
    this.settingService.getIDProofList().then((res: any) => {
      this.idproofList = res;
    });
  }

  getValidation() {
    this.qualificationForm = this.formBuilder.group({
      id: ['', []],
      Degree: ['', [Validators.required]],
      Abberivation: ['', [Validators.required]],
    });

    this.idproofForm = this.formBuilder.group({
      id: ['', []],
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
  }

  get qForm() { return this.qualificationForm.controls; }
  get iForm() { return this.idproofForm.controls; }

  createIdProof() {
    this.idSubmitted = true;
    if (this.idproofForm.valid) {
      let data = this.idproofForm.value;
      let promise = null;
      let msg = Labels.SUCCESS.ADDED;
      if (data.id) {
        promise = this.settingService.updateIdProof(data);
        msg = Labels.SUCCESS.UPDATED;
      } else {
        promise = this.settingService.createIdProof(data);
      }
      promise.then((res: any) => {
        this.displayIDProofDialog = false;
        this.resetIDProofForm();
        this.getIDProofList();
        this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: msg });
      });
    }
  }

  createQualification() {
    this.qSubmitted = true;
    if (this.qualificationForm.valid) {
      let data = this.qualificationForm.value;
      let promise = null;
      let msg = Labels.SUCCESS.ADDED;
      if (data.id) {
        promise = this.settingService.updateQualification(data);
        msg = Labels.SUCCESS.UPDATED;
      } else {
        promise = this.settingService.createQualification(data);
      }

      promise.then((res: any) => {
        this.displayQualiDialog = false;
        this.resetQualiForm();
        this.getQualiList();
        this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: msg });
      });
    }
  }

  resetQualiForm() {
    this.qualificationForm.reset();
    this.qSubmitted = false;
  }

  resetIDProofForm() {
    this.idproofForm.reset();
    this.idSubmitted = false;
  }

  editQualification(data) {
    this.displayQualiDialog = true;
    let obj = { id: data.id, Degree: data.Degree, Abberivation: data.Abberivation };
    this.qualificationForm.setValue(obj);
  }


  editIDProof(data) {
    this.displayIDProofDialog = true;
    let obj = { id: data.id, Name: data.Name, Description: data.Description };
    this.idproofForm.setValue(obj);
  }

  deleteQualification(id) {
    this.settingService.deleteQualification(id).then((res: any) => {
      this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: Labels.SUCCESS.DELETED });
      this.displayDeleteConfimModal = false;
      this.getQualiList();
    });
  }

  deleteIDProof(id) {
    this.settingService.deleteIdProof(id).then((res: any) => {
      this.msgService.add({ severity: 'success', summary: Labels.SUCCESS.TEXT, detail: Labels.SUCCESS.DELETED });
      this.displayDeleteConfimModal = false;
      this.getIDProofList();
    });
  }

  deleteItem() {
    let param = this.currPage.split('-');
    if (param) {
      if (param[0] === 'QUALI') {
        this.deleteQualification(param[1]);
      } else {
        this.deleteIDProof(param[1]);
      }
    }
  }

}
