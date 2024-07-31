import { Component, OnInit} from '@angular/core';
import { AppService } from "../../app.service";
import { Server } from "../../shemas/shemas";

import {ConfirmationService, PrimeNGConfig} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, NgForm, Validators} from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['server.component.css'],
  providers: [AppService, ConfirmationService, MessageService]
})
export class ServerComponent implements OnInit {

  constructor(private AppService: AppService,
              private _httpClient: HttpClient,
              private primengConfig: PrimeNGConfig,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private formBuilder: FormBuilder
              ) { this.server =  new Server(); }

  Servers: Server[] = new Array<Server>();
  hostServers: Server[] = new Array<Server>();
  ServerDialog: boolean = false;
  submitted: boolean = true;
  loading: boolean = false;
  cols: any[] = [];
  colsServer: any;
  selectItem: any[] = [];
  server: Server;
  vserver: {} = {};

  ngOnInit(): void {
    this.getData();

    //Колонки бд
    this.colsServer = [
      {field: 'host_server_id', header: 'ID хоста', type: 'number'},
      {field: 'model_name', header: 'Наименование модели', type: 'string'},
      {field: 'serial_num', header: 'Серийный номер', type: 'string'},
      {field: 'inventory_num', header: 'Инвентарный номер', type: 'string'},
      {field: 'processor_quantity', header: 'Частота процессора (ГГц)', type: 'string'},
      {field: 'total_cores_quantity', header: 'Количество ядер', type: 'string'},
      {field: 'total_threads_quantity', header: 'Количество потоков', type: 'string'},
      {field: 'total_ram_size', header: 'RAM (Гб)', type: 'string'},
      {field: 'dns_name', header: 'DNS имя', type: 'string'},
      {field: 'dns_domain', header: 'DNS домен', type: 'string'},
      {field: 'ip_adresses', header: 'IP адрес', type: 'string'},
      {field: 'management_ip_adresses', header: 'Управляющий IP адрес', type: 'string'},
      {field: 'rack_height', header: 'Высота сервера (Unit)', type: 'string'},
      {field: 'system_name', header: 'Название ОС', type: 'string'},
      {field: 'system_license', header: 'Лицензия ОС', type: 'string'},
      {field: 'system_need_to_license', header: 'ОС требует лицензирования', type: 'boolean'},
      {field: 'my_notes', header: 'Заметки', type: 'string'},
      {field: 'id', header: 'ID', type: 'string'}
    ]
    this.primengConfig.ripple = true;
  }
  //Получение данных из бд
  getData(){
    this.loading = true;
    setTimeout(() => {
      this.AppService.getServer().subscribe({
        error: (data: any) => {
          console.log(data);
          this.loading = false;
        },
        next: (data: Server[]) => {
          this.Servers = data;
          this.refreshHostServers();
          this.loading = false;
          console.log(this.Servers);
        }
      });
    })
  }

  refreshHostServers(){
    this.hostServers = this.Servers.filter(f=>f.host_server_id==null||f.host_server_id==undefined);
  }

//Закрытие диалогового окна
  hideDialog() {
    this.ServerDialog = false;
    this.submitted = false;
  }

//Кнопка добавления новой записи в бд
  addServer() {
    this.server = new Server();
    this.submitted = false;
    this.ServerDialog = true;
  }

//кнопка для редактирования строки в бд
  editServer(server: Server) {
    this.server = {...server};
    this.submitted = false;
    this.ServerDialog = true;
    }

//Кнопка для удаления строки из бд
  deleteServer(server: number) {
    console.log(server);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.AppService.deleteServer(server).subscribe(data=>{
          console.log(data)
          this.getData();
          this.refreshHostServers();
        },error => {
          console.log(error);
        })
        console.log('Delete successful');
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'успешно удалено', life: 3000});
      }
    });
  }

//сохранение/изменение данных
  saveServer() {
    console.log('save');
    this.submitted = true;
    if (this.server.id) {
      this.AppService.updateServer(this.server).subscribe({
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
          console.log(this.server);
          this.getData();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно обновлено', life: 3000});
          this.ServerDialog = false;
          this.refreshHostServers();
        }
      });
    } else {
      this.AppService.addServer(this.server).subscribe({
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
        next: (data:Server) => {
          this.Servers.push(data);
          console.log(this.server);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Успешно создано', life: 3000});
          this.ServerDialog = false;
          this.refreshHostServers();
          this.getData();
        }
        });
      }
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
