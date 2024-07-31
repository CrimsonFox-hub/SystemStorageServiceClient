import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import {Storage, Server, Storage_Partition} from "../../shemas/shemas";

import { HttpClient } from "@angular/common/http";
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-storage-partition',
  templateUrl: './storage-partition.component.html',
  styleUrls: ['./storage-partition.component.css'],
  providers: [AppService, ConfirmationService]
})
export class StoragePartitionComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) { this.storage_partition =  new Storage_Partition(); }

  Storage_PartitionDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  colsStorage_Partition: any;
  cols: any[] = [];
  selectItem: any[] = [];
  storage_partition: Storage_Partition;
  Storage_Partitions: Storage_Partition[] = new Array<Storage_Partition>();
  storages: Storage[] = new Array<Storage>();
  servers: Server[] = new Array<Server>();

  ngOnInit(): void {
    this.getData();
    this.loading = true;
    setTimeout(() => {
      this.AppService.getStorage().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage[]) => {
          this.getData();
          this.storages = data;
          this.loading = false;
        }
      });
    })
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
    this.colsStorage_Partition = [
      {field: 'id', header: 'ID', type: 'string'},
      {field: 'storage_id', header: 'ID массива', type: 'string'},
      {field: 'total_size', header: 'Размер', type: 'string'},
      {field: 'server_id', header: 'ID сервера', type: 'string'},
      {field: 'server_mount_point', header: 'Точка подключения сервера', type: 'string'},
      {field: 'my_notes', header: 'Заметки', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getStorage_Partition().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage_Partition[]) => {
          this.Storage_Partitions = data;
          this.loading = false;         
          console.log(this.Storage_Partitions);
        }
      });
    })
  }

  //Закрытие диалогового окна
  hideDialog() {
    this.Storage_PartitionDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addStorage_Partition() {
    this.storage_partition = new Storage_Partition();
    this.submitted = false;
    this.Storage_PartitionDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editStorage_Partition(storage_partition: Storage_Partition) {
    this.storage_partition = {...storage_partition};
    this.submitted = false;
    this.Storage_PartitionDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteStorage_Partition(storage_partition: number) {
    console.log(storage_partition);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteStorage_Partition(storage_partition).subscribe(data=>{
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
  saveStorage_Partition() {
    console.log('save');
    this.submitted = true;
    if (this.storage_partition.id) {
      this.AppService.updateStorage_Partition(this.storage_partition).subscribe({
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
          console.log(this.storage_partition);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.Storage_PartitionDialog = false;
        }
      });
    } else {
      this.AppService.addStorage_Partition(this.storage_partition).subscribe({
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
        next: (data:Storage_Partition) => {
          this.Storage_Partitions.push(data);
          console.log(this.storage_partition);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.Storage_PartitionDialog = false;
        }
      });
    }
    this.submitted = false;
  }

  //Проверка на числовое значение
  onKeyPress(event: any) {
    const regexpNumber = /[0-9\+\-\.\,\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
}
