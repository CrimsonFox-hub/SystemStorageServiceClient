import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppService } from "../../app.service";
import { Server_Partition, Service, Service_Data, Storage_Partition, Server, Storage} from "../../shemas/shemas";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { throwError, Observable, filter } from 'rxjs';

@Component({
  selector: 'app-service-data',
  templateUrl: './service-data.component.html',
  styleUrls: ['./service-data.component.css'],
  providers: [AppService, ConfirmationService]
})
export class ServiceDataComponent implements OnInit {
  

  form!: FormGroup;
  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,)
   { this.service_data =  new Service_Data(); }

  Service_DataDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  cols: any[] = [];
  selectItem: any[] = [];
  service_data: Service_Data;
  Service_Datas: Service_Data[] = new Array<Service_Data>();
  services?: Service[] = new Array<Service>();
  servers?: Server[] = new Array<Server>();
  hostServers?: Service_Data[] = new Array<Service_Data>();
  storages?: Storage[] = new Array<Storage>();
  server_partitions?: Server_Partition[] = new Array<Server_Partition>();
  storage_partitions?: Storage_Partition[] = new Array<Storage_Partition>();
  colsService_Data: any;

	@Output() onChanged = new EventEmitter<Service>();
  Services?: Service;

  ngOnInit(): void {

    setTimeout(()=> {
      this.getData();
      this.loading = true;
      this.AppService.getStorage_Partition().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage_Partition[]) => {
          this.loading = false;
          this.storage_partitions = data;
          this.getData();
        }
      });
      this.AppService.getServer_Partition().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server_Partition[]) => {
          this.loading = false;
          this.server_partitions = data;
          this.getData();
        }
      });
      this.AppService.getService().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Service[]) => {
          this.loading = false;
          this.services = data;
          this.getData();
        }
      });  
     })
    
    //Колонки бд
    this.colsService_Data= [
      {field: 'serv_id', subfield:'service.server.dns_name + service.server_description', header: 'Сервис', type: 'string'},
      {field: 'storage_partition_id', subfield:'storage_partition.storage.dns_name + storage_partition.server_mount_point', header: 'Точка доступа массива', type: 'string'},
      {field: 'server_partition_id', subfield:'server_partition.server.dns_name + server_partition.server_mount_point', header: 'Точка доступа сервера', type: 'string'},
      {field: 'path', header: 'Путь', subfield:'path', type: 'string'},
      {field: 'my_notes', header: 'Заметки', subfield:'my_notes', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  onChange($event: Event, service: Service){
    this.getSP(service);
    this.onChanged.emit(service);
  }
  getSP(service: Service ){
    this.Services = service;
    //let server_id = this.Services?.server_id;     
    setTimeout((server_id: number )=>{
      this.loading = true;
      this.AppService.getServer_Partition_S(server_id).subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server_Partition[]) => {
          this.server_partitions = data;
          this.loading = false;
          
        }
      });
      this.AppService.getStorage_Partition_S(server_id).subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage_Partition[]) => {
          this.loading = false;
          this.storage_partitions = data;
        }
      });  
    });

  }

  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getService_Data().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Service_Data[]) => {
          this.loading = false; 
          this.Service_Datas = data;
          console.log(this.Service_Datas);     
        }
      });
    })
  }

	searchServer(term: string, item: any) {
		term = term.toLocaleLowerCase();
		return (item?.server?.dns_name + item?.server_mount_point ).toLocaleLowerCase().includes(term);
	}
  searchStorage(term: string, item: any) {
		term = term.toLocaleLowerCase();
		return (item?.storage?.dns_name + item?.server_mount_point ).toLocaleLowerCase().includes(term);
	}
  searchService(term: string, item: any) {
		term = term.toLocaleLowerCase();
		return (item?.server?.dns_name + item?.server_description ).toLocaleLowerCase().includes(term);
	}
  //Закрытие диалогового окна
  hideDialog() {
    this.Service_DataDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addService_Data() {
    this.service_data = new Service_Data();
    this.submitted = false;
    this.Service_DataDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editService_Data(service_data: Service_Data) {
    this.service_data = {...service_data};
    this.submitted = false;
    this.Service_DataDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteService_Data(service_data: number) {
    console.log(service_data);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteService_Data(service_data).subscribe(data=>{
          console.log(data)
          this.getData();
        },error => {
          console.log(error);
        })
        console.log('Delete successful');
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'успешно удалено', life: 3000});
      }
    });
  }

  //Сохранение/изменение данных
  
  saveService_Data() {
    console.log('save');
    this.submitted = true;
    setTimeout(()=> {
    if (this.service_data.service_id) {
      this.AppService.updateService_Data(this.service_data).subscribe({
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
          console.log(this.service_data);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.Service_DataDialog = false;
        }
      });
    } else {
      this.AppService.addService_Data(this.service_data).subscribe({
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
        next: (data:Service_Data) => {
          this.Service_Datas.push(data);
          console.log(this.service_data);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.Service_DataDialog = false;
          this.getData();
        }
      });
    }
    this.submitted = false;
  }
    )}
}
