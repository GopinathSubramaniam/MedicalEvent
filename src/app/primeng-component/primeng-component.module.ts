import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    DropdownModule,
    TableModule,
    DialogModule,
    TabViewModule,
    CalendarModule,
    CheckboxModule,
    RatingModule,
    ToastModule
  ],
  exports: [CardModule, DropdownModule, TableModule, DialogModule, TabViewModule, CalendarModule, CheckboxModule, RatingModule,
    ToastModule]
})
export class PrimengComponentModule { }
