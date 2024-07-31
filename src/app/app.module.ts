import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';

import { ServerComponent } from './sss/server/server.component';
import { ServerDriveComponent } from './sss/server-drive/server-drive.component';
import { ServerPartitionComponent } from './sss/server-partition/server-partition.component';
import { ServiceComponent } from './sss/service/service.component';
import { ServiceDataComponent } from './sss/service-data/service-data.component';
import { StorageComponent } from './sss/storage/storage.component';
import { StorageDriveComponent } from './sss/storage-drive/storage-drive.component';
import { StoragePartitionComponent } from './sss/storage-partition/storage-partition.component';
import {CdkTableModule} from "@angular/cdk/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppService} from "./app.service";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {AppRoutingModule} from "./app-routing.module";
import {RadioButtonModule} from "primeng/radiobutton";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService } from 'primeng/api';
import {AccordionModule} from "primeng/accordion";
import {MenuModule} from "primeng/menu";

import { NgSelectModule } from '@ng-select/ng-select';
import {MessagesModule} from "primeng/messages";


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServerDriveComponent,
    ServerPartitionComponent,
    ServiceComponent,
    ServiceDataComponent,
    StorageComponent,
    StorageDriveComponent,
    StoragePartitionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    CdkTableModule,
    FormsModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    ToolbarModule,
    RippleModule,
    RadioButtonModule,
    ConfirmDialogModule,
    AccordionModule,
    MenuModule,
    NgSelectModule,
    MessagesModule,
    ReactiveFormsModule
  ],

  providers: [ AppService,
    MessageService,
    ConfirmationService],
  bootstrap: [AppComponent],
})

export class AppModule { }
