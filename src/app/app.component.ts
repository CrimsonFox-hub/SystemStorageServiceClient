import { Component, OnInit } from '@angular/core';
import {SelectionModel} from "@angular/cdk/collections";
import { HttpClient } from '@angular/common/http';
import {PrimeNGConfig, MenuItem} from "primeng/api";

import {ServerComponent} from "./sss/server/server.component";
import {ServerDriveComponent} from "./sss/server-drive/server-drive.component";
import {ServerPartitionComponent} from "./sss/server-partition/server-partition.component";
import {ServiceComponent} from "./sss/service/service.component";
import {ServiceDataComponent} from "./sss/service-data/service-data.component";
import {StorageComponent} from "./sss/storage/storage.component";
import {StorageDriveComponent} from "./sss/storage-drive/storage-drive.component";
import {StoragePartitionComponent} from "./sss/storage-partition/storage-partition.component";
import {Server} from "./shemas/shemas";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Системы, хранилища и сервисы';
  //displayedColumns
  Server = new SelectionModel<ServerComponent>(true, []);
  Server_Drive = new SelectionModel<ServerDriveComponent>(true, []);
  Server_Partition = new SelectionModel<ServerPartitionComponent>(true, []);
  Service = new SelectionModel<ServiceComponent>(true, []);
  Service_Drive = new SelectionModel<ServiceDataComponent>(true, []);
  Storage = new SelectionModel<StorageComponent>(true, []);
  Storage_Drive = new SelectionModel<StorageDriveComponent>(true, []);
  Storage_Partition = new SelectionModel<StoragePartitionComponent>(true, []);

  constructor(private http: HttpClient, private primengConfig:PrimeNGConfig) { }

  items: MenuItem[] = new Array<MenuItem>();

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.primengConfig.setTranslation({
      startsWith: 'Начинается с',
      contains: "Содержит",
      noFilter: "Без фильтра",
      notContains: "Не содержит",
      endsWith: "Оканчивается на",
      equals: "Равно",
      notEquals: "Не равно",
      lt: "Меньше",
      lte: "Меньше или равно",
      gt: "Больше",
      gte: "Больше или равно",
      is: "Является",
      isNot: "Не является",
      before: "Перед",
      after: "После",
      clear: "Очистить",
      apply: "Применить",
      matchAll: "Все соответствия",
      matchAny: "Любое совпадение",
      addRule: "Добавить правило",
      removeRule: "Удалить правило",
      accept: "Да",
      reject: "Нет",
      choose: "Выберите",
      upload: "Загрузить",
      cancel: "Отменить",
      dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
      dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"],
      today: "Сегодня",
      emptyMessage: "Не найдено",
      emptyFilterMessage: "Результаты не найдены",
    })

    this.items = [{
      label: 'Меню',
      items: [{
        label: 'Сервера',
        icon: 'ballot',
        url:'./server'
      },
      {
        label: 'Диски серверов',
        icon: 'ballot',
        url: './server_drive'
      },
      {
        label: 'Разделы сервера',
        icon: 'ballot',
        url: './server_partition'
      },
      {
        label: 'Сервисы',
        icon: 'ballot',
        url: './service'
      },
      {
        label: 'Данные сервисов',
        icon: 'ballot',
        url: './service_data'
      },
      {
        label: 'Массивы',
        icon: 'ballot',
        url: './storage'
      },
      {
        label: 'Диски массивов',
        icon: 'ballot',
        url: './storage_drive'
      },
      {
        label: 'Разделы массивов',
        icon: 'ballot',
        url: './storage_partition'
      }]
    }]
  }

}
