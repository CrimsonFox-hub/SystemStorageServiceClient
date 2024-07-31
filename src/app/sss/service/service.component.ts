import { Component, OnInit} from '@angular/core';
import { AppService } from "../../app.service";
import {Server, Service} from "../../shemas/shemas";

import {PrimeNGConfig, ConfirmationService, MessageService} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  providers: [AppService, ConfirmationService]
})
export class ServiceComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) { this.service =  new Service(); }



  ServiceDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  cols: any[] = [];
  selectItem: any[] = [];
  Services: Service[] = new Array<Service>();
  servers: Server[] = new Array<Server>();
  bService: Service[] = new Array<Service>();
  hostService: Service[] = new Array<Service>();
  colsService: any;
  service: Service;

  ngOnInit(): void {
    
    setTimeout(() => {
      this.AppService.getServer().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server[]) => {
          this.getData();
          this.servers = data;
          this.loading = false;
        }
      });
    })
    //Колонки бд
    this.colsService = [
      {field: 'id', header: 'ID', type: 'string'},
      {field: 'server_id', header: 'Имя хоста', type: 'string'},
      {field: 'server_role_description', header: 'Наиманование сервиса', type: 'string'},
      {field: 'server_description', header: 'Базовая технология', type: 'string'},
      {field: 'backup_service_id', header: 'Сервис бекапирования', type: 'string'},
      {field: 'my_notes', header: 'Заметки', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getService().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Service[]) => {
          this.Services = data;
          this.loading = false;
          console.log(this.Services);
          this.refreshHostService();
        }
      });
    })
  }

  refreshHostService(){
    this.hostService = this.Services.filter(f=>f.backup_service_id==null||f.backup_service_id==undefined);
  }

  

  //Закрытие диалогового окна
  hideDialog() {
    this.ServiceDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addService() {
    this.service = new Service();
    this.submitted = false;
    this.ServiceDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editService(service: Service) {
    this.service = {...service};
    this.submitted = false;
    this.ServiceDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteService(service: number) {
    console.log(service);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteService(service).subscribe(data=>{
          console.log(data);
          this.getData();
          this.refreshHostService();
        },error => {
          console.log(error);
        })
        console.log('Delete successful');
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'успешно удалено', life: 3000});
      }
    });
  }

  //Сохранение/изменение данных
  saveService() {
    console.log('save');
    this.submitted = true;
    if (this.service.id) {
      this.AppService.updateService(this.service).subscribe({
        error: (data: any) => {
          let errorMessage = '';
          if (data.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${data.error.message}`;
          } else {
            // server-side error
            if(data.status == 400) {
              errorMessage = `Код ошибки: ${data.status}\nСообщение: Ошибка записи в базу данных`;
            }
            else {
              errorMessage = `Код ошибки: ${data.status}\nСообщение: Ошибка подключения к базе данных`;
            }
          }
          console.log(errorMessage);
          this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, life: 3000});
          return throwError(() => {
            return errorMessage;  
          });
        },
        next: () => {
          console.log(this.service);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.ServiceDialog = false;
        }
      });
    } else {
      this.AppService.addService(this.service).subscribe({
        error: (data: any) => {
          let errorMessage = '';
          if (data.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${data.error.message}`;
          } else {
            // server-side error
            if(data.status == 400) {
              errorMessage = `Код ошибки: ${data.status}\nСообщение: Ошибка записи в базу данных`;
            }
            else {
              errorMessage = `Код ошибки: ${data.status}\nСообщение: Ошибка подключения к базе данных`;
            }
          }
          console.log(errorMessage);
          this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, life: 3000});
          return throwError(() => {
            return errorMessage;  
          });
        },
        next: (data:any) => {
          this.Services.push(data);
          this.refreshHostService();
          console.log(this.service);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.ServiceDialog = false;
          this.getData();
        }
      });
    }
    this.submitted = false;
  }
}
