import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { Storage_Drive, Storage} from "../../shemas/shemas";

import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-storage-drive',
  templateUrl: './storage-drive.component.html',
  styleUrls: ['./storage-drive.component.css'],
  providers: [AppService, ConfirmationService]
})
export class StorageDriveComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) { this.storage_drive =  new Storage_Drive(); }

  Storage_DriveDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  colsStorage_Drive: any;
  cols: any[] = [];
  selectItem: any[] = [];
  storage_drive: Storage_Drive;
  Storage_Drives: Storage_Drive[] = new Array<Storage_Drive>();
  storages: Storage[] = new Array<Storage>();

  ngOnInit(): void {
    
    this.loading = true;
    setTimeout(() => {
      this.AppService.getStorage().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage[]) => {
          this.storages = data;
          this.getData();
          this.loading = false;
        }
      });
    })
    //Колонки бд
    this.colsStorage_Drive = [
      {field: 'model_name', header: 'Наименование модели', type: 'string'},
      {field: 'storage_id', header: 'ID массива', type: 'string'},
      {field: 'total_quantity', header: 'Общее количество', type: 'string'},
      {field: 'storage_size', header: 'Размер (ГБ)', type: 'string'},
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
      this.AppService.getStorage_Drive().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage_Drive[]) => {
          this.Storage_Drives = data;
          this.loading = false;
          console.log(this.Storage_Drives);
        }
      });
    })
  }

  //Закрытие диалогового окна
  hideDialog() {
    this.Storage_DriveDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addStorage_Drive() {
    this.storage_drive = new Storage_Drive();
    this.submitted = false;
    this.Storage_DriveDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editStorage_Drive(storage_drive: Storage_Drive) {
    this.storage_drive = {...storage_drive};
    this.submitted = false;
    this.Storage_DriveDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteStorage_Drive(storage_drive: number) {
    console.log(storage_drive);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteStorage_Drive(storage_drive).subscribe(data=>{
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
  saveStorage_Drive() {
    console.log('save');
    this.submitted = true;
    if (this.storage_drive.id) {
      this.AppService.updateStorage_Drive(this.storage_drive).subscribe({
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
          console.log(this.storage_drive);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.Storage_DriveDialog = false;
        }
      });
    } else {
      this.AppService.addStorage_Drive(this.storage_drive).subscribe({
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
        next: (data:Storage_Drive) => {
          this.Storage_Drives.push(data);
          console.log(this.storage_drive);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.Storage_DriveDialog = false;
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
