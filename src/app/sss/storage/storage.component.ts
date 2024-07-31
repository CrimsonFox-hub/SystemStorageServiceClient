import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { Storage} from "../../shemas/shemas";

import {ConfirmationService, MessageService, PrimeNGConfig} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [AppService, ConfirmationService]
})
export class StorageComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService
  ) { this.storage =  new Storage(); }

  

  StorageDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  colsStorage: any;
  cols: any[] = [];
  selectItem: any[] = [];
  Storages: Storage[] = new Array<Storage>();
  storage: Storage;

  ngOnInit(): void {
    this.getData();
    //Колонки бд
    this.colsStorage = [
      {field: 'model_name', header: 'Наименование модели', type: 'string'},
      {field: 'serial_num', header: 'Серийный номер', type: 'string'},
      {field: 'inventory_num', header: 'Инвентарный номер', type: 'string'},
      {field: 'dns_name', header: 'DNS имя', type: 'string'},
      {field: 'dns_domain', header: 'DNS домен', type: 'string'},
      {field: 'ip_adresses', header: 'IP адрес', type: 'string'},
      {field: 'management_ip_adresses', header: 'Управляющий IP адрес', type: 'string'},
      {field: 'connection_type', header: 'Тип соединения', type: 'string'},
      {field: 'rack_height', header: 'Высота массива (Unit)', type: 'string'},
      {field: 'total_size', header: 'Размер', type: 'string'},
      {field: 'my_notes', header: 'Заметки', type: 'string'},
      {field: 'id', header: 'ID', type: 'number'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getStorage().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Storage[]) => {
          this.Storages = data;
          this.loading = false;
          console.log(this.Storages);
        }
      });
    })
  }

  //Закрытие диалогового окна
  hideDialog() {
    this.StorageDialog = false;
    this.submitted = false;
  }

  //Кнопка добавления новой записи в бд
  addStorage() {
    this.storage = new Storage();
    this.submitted = false;
    this.StorageDialog = true;
  }

  //Кнопка для редактирования строки в бд
  editStorage(storage: Storage) {
    this.storage = {...storage};
    this.submitted = false;
    this.StorageDialog = true;
  }

  //Кнопка для удаления строки из бд
  deleteStorage(storage: number) {
    console.log(storage);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteStorage(storage).subscribe(data=>{
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
  saveStorage() {
    console.log('save');
    this.submitted = true;
    if (this.storage.id) {
      this.AppService.updateStorage(this.storage).subscribe({
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
          console.log(this.storage);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.StorageDialog = false;
        }
      });
    } else {
      this.AppService.addStorage(this.storage).subscribe({
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
        next: (data:Storage) => {
          this.Storages.push(data);
          console.log(this.storage);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.StorageDialog = false;
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
