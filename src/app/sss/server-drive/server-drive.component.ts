import {Component, OnInit} from '@angular/core';
import { AppService } from "../../app.service";
import {Server, Server_Drive} from "../../shemas/shemas";

import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { throwError } from 'rxjs';



@Component({
  selector: 'app-server-drive',
  templateUrl: './server-drive.component.html',
  styleUrls: ['./server-drive.component.css'],
  providers:[AppService, ConfirmationService]
})
export class ServerDriveComponent implements OnInit {


  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
  ) {  this.server_drive = new Server_Drive();}

  Server_DriveDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  cols: any[] = [];
  selectItem: any[] = [];
  Server_Drives: Server_Drive[] = new Array<Server_Drive>();
  server_drive: Server_Drive;
  servers: Server[] = new Array<Server>();
  colsServer_Drive: any;

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
    this.colsServer_Drive = [
      {field: 'model_name', header: 'Наименование модели', type: 'string'},
      {field: 'server_id', header: 'Днс имя сервера', type: 'string'},
      {field: 'total_quantity', header: 'Общее количество', type: 'string'},
      {field: 'drive_size', header: 'Размер (ГБ)', type: 'string'},
      {field: 'linterface', header: 'Интерфейс', type: 'string'},
      {field: 'factor', header: 'Фактор', type: 'string'},
      {field: 'technology', header: 'Технология', type: 'string'},
      {field: 'spindle_speed', header: 'Скорость вращения шпинделя (об/мин)', type: 'string'},
      {field: 'my_notes', header: 'Заметки', type: 'string'},
      {field: 'id', header: 'ID', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getServer_Drive().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server_Drive[]) => {
          this.Server_Drives = data;
          this.loading = false;
          console.log(this.Server_Drives);
        }
      });
    })
  }

  //Закрытие диалогового окна
  hideDialog() {
    this.Server_DriveDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addServer_Drive() {
    this.server_drive = new Server_Drive();
    this.submitted = false;
    this.Server_DriveDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editServer_Drive(server_drive: Server_Drive) {
    this.server_drive = {...server_drive};
    this.submitted = false;
    this.Server_DriveDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteServer_Drive(server_drive: number) {
    console.log(server_drive);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteServer_Drive(server_drive).subscribe(data=>{
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
  saveServer_Drive() {
    console.log('save');
    this.submitted = true;
    if (this.server_drive.id) {
      this.AppService.updateServer_Drive(this.server_drive).subscribe({
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
          console.log(this.server_drive);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.Server_DriveDialog = false;
        }
      });
    } else {
      this.AppService.addServer_Drive(this.server_drive).subscribe({
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
        next: (data:Server_Drive) => {
          this.Server_Drives.push(data);
          console.log(this.server_drive);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.Server_DriveDialog = false;
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
