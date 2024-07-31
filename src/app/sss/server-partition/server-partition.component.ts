import {Component, OnInit} from '@angular/core';
import { AppService } from "../../app.service";
import {Server, Server_Partition} from "../../shemas/shemas";

import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-server-partition',
  templateUrl: './server-partition.component.html',
  styleUrls: ['./server-partition.component.css'],
  providers: [AppService, ConfirmationService]
})
export class ServerPartitionComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) { }

 

  Server_PartitionDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  cols: any[] = [];
  selectItem: any[] = [];
  Server_Partitions: Server_Partition[] = new Array<Server_Partition>();
  server_partition: Server_Partition =  new Server_Partition();
  servers: Server[] = new Array<Server>();
  colsServer_Partition: any;

  ngOnInit(): void {

    setTimeout(() => {
      this.AppService.getServer().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server[]) => {
          this.servers = data;
          this.getData();
          this.loading = false;
        }
      });
    })
    //Колонки бд
    this.colsServer_Partition = [
      {field: 'id', header: 'ID', type: 'string'},
      {field: 'server_id', header: 'ID сервера', type: 'string'},
      {field: 'total_size', header: 'Размер', type: 'string'},
      {field: 'server_mount_point', header: 'Точка подключения сервера', type: 'string'},
      {field: 'my_notes', header: 'Заметки', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getServer_Partition().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server_Partition[]) => {
          this.Server_Partitions = data;
          this.loading = false;
          console.log(this.Server_Partitions);
        }
      });
    })
  }

  //Закрытие диалогового окна
  hideDialog() {
    this.Server_PartitionDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addServer_Partition() {
    this.server_partition = new Server_Partition();
    this.submitted = false;
    this.Server_PartitionDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editServer_Partition(server_partition: Server_Partition) {
    this.server_partition = {...server_partition};
    this.submitted = false;
    this.Server_PartitionDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteServer_Partition(server_partition: number) {
    console.log(server_partition);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteServer_Partition(server_partition).subscribe(data=>{
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
  saveServer_Partition() {
    console.log('save');
    this.submitted = true;
    if (this.server_partition.id) {
      this.AppService.updateServer_Partition(this.server_partition).subscribe({
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
          console.log(this.server_partition);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.Server_PartitionDialog = false;
        }
      });
    } else {
      this.AppService.addServer_Partition(this.server_partition).subscribe({
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
        next: (data:Server_Partition) => {
          this.Server_Partitions.push(data);
          console.log(this.server_partition);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.Server_PartitionDialog = false;
          this.getData();
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
