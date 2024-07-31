import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import {
  Server,
  Server_Drive,
  Server_Partition,
  Service,
  Service_Data,
  Storage,
  Storage_Drive,
  Storage_Partition
} from "./shemas/shemas";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient,
              private messageService: MessageService)
               { }
  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    this.messageService.add({severity:'error', summary: 'Error', detail: errorMessage, life: 3000});
    return throwError(() => {
      return errorMessage;  
    });
  }

  getServer() {
    return this.http.get<Server[]>( `${environment.apiUrl}/api/server`)
  }
  getIdServer(id:number) {
    return this.http.get<Server>(`${environment.apiUrl}/api/server/${id}`)
  }
   addServer(data:Server) {
     return this.http.post<Server>(`${environment.apiUrl}/api/server`, data)
   }
   updateServer(data:Server) {
     return this.http.put(`${environment.apiUrl}/api/server/${data.id}`, data)
   }
   deleteServer(id:number){
     return this.http.delete(`${environment.apiUrl}/api/server/${id}`)
   }

   getServer_Drive(){
     return this.http.get<Server_Drive[]>(`${environment.apiUrl}/api/server_drive`)
   }
   getIdServer_Drive(id:number) {
     return this.http.get<Server_Drive>(`${environment.apiUrl}/api/server_drive/${id}`)
   }
   addServer_Drive(data:Server_Drive) {
     return this.http.post<Server_Drive>(`${environment.apiUrl}/api/server_drive`, data)
   }
   updateServer_Drive( data:Server_Drive) {
     return this.http.put(`${environment.apiUrl}/api/server_drive/${data.id}`, data)
   }
   deleteServer_Drive(id:number){
     return this.http.delete(`${environment.apiUrl}/api/server_drive/${id}`)
   }

   getServer_Partition() {
     return this.http.get<Server_Partition[]>(`${environment.apiUrl}/api/server_partition`)
   }
   getIdServer_Partition(id:number) {
     return this.http.get<Server_Partition>(`${environment.apiUrl}/api/server_partition/${id}`)
   }
   addServer_Partition(data:Server_Partition) {
     return this.http.post<Server_Partition>(`${environment.apiUrl}/api/server_partition`, data)
   }
   updateServer_Partition( data:Server_Partition) {
     return this.http.put(`${environment.apiUrl}/api/server_partition/${data.id}`, data)
   }
   deleteServer_Partition(id:number){
     return this.http.delete(`${environment.apiUrl}/api/server_partition/${id}`)
   }
   getServer_Partition_S(server_id:number){
    return this.http.get<Server_Partition[]>(`${environment.apiUrl}/api/server_partition/${server_id}`)
  }

   getService(){
     return this.http.get<Service[]>(`${environment.apiUrl}/api/service`)
   }
   getIdService(id:number) {
     return this.http.get<Service>(`${environment.apiUrl}/api/service/${id}`)
   }
   addService(data:Service) {
     return this.http.post<Service>(`${environment.apiUrl}/api/service`, data)
   }
   updateService( data:Service) {
     return this.http.put(`${environment.apiUrl}/api/service/${data.id}`, data)
   }
   deleteService(id:number){
     return this.http.delete(`${environment.apiUrl}/api/service/${id}`)
   }

   getService_Data() {
     return this.http.get<Service_Data[]>(`${environment.apiUrl}/api/service_data`)
   }
   getIdService_Data(service_id:number){
     return this.http.get<Service_Data>(`${environment.apiUrl}/api/service_data/${service_id}`)
   }
   addService_Data(data:Service_Data) {
     return this.http.post<Service_Data>(`${environment.apiUrl}/api/service_data`, data)
   }
   updateService_Data( data:Service_Data) {
     return this.http.put(`${environment.apiUrl}/api/service_data/${data.service_id}`, data)
   }
   deleteService_Data(service_id:number){
     return this.http.delete(`${environment.apiUrl}/api/service_data/${service_id}`)
   }

   getStorage() {
     return this.http.get<Storage[]>(`${environment.apiUrl}/api/storage`)
   }
   getIdStorage(id:number) {
     return this.http.get<Storage>(`${environment.apiUrl}/api/storage/${id}`)
   }
   addStorage(data:Storage) {
     return this.http.post<Storage>(`${environment.apiUrl}/api/storage`, data)
   }
   updateStorage(data:Storage) {
     return this.http.put(`${environment.apiUrl}/api/storage/${data.id}`, data)
   }
   deleteStorage(id:number){
     return this.http.delete(`${environment.apiUrl}/api/storage/${id}`)
   }

   getStorage_Drive() {
     return this.http.get<Storage_Drive[]>(`${environment.apiUrl}/api/storage_drive`)
   }
   getIdStorage_Drive(id:number){
     return this.http.get<Storage_Drive>(`${environment.apiUrl}/api/storage_drive/${id}`)
   }
   addStorage_Drive(data:Storage_Drive) {
     return this.http.post<Storage_Drive>(`${environment.apiUrl}/api/storage_drive`, data)
   }
   updateStorage_Drive( data:Storage_Drive) {
     return this.http.put(`${environment.apiUrl}/api/storage_drive/${data.id}`, data)
   }
   deleteStorage_Drive(id:number){
     return this.http.delete(`${environment.apiUrl}/api/storage_drive/${id}`)
   }

   getStorage_Partition() {
     return this.http.get<Storage_Partition[]>(`${environment.apiUrl}/api/storage_partition`)
   }
   getIdStorage_Partition(id:number) {
     return this.http.get<Storage_Partition>(`${environment.apiUrl}/api/storage_partition/${id}`)
   }
   addStorage_Partition(data:Storage_Partition) {
     return this.http.post<Storage_Partition>(`${environment.apiUrl}/api/storage_partition`, data)
   }
   updateStorage_Partition(data:Storage_Partition) {
     return this.http.put(`${environment.apiUrl}/api/storage_partition/${data.id}`, data)
   }
   deleteStorage_Partition(id:number){
     return this.http.delete(`${environment.apiUrl}/api/storage_partition/${id}`)
   }
   getStorage_Partition_S(server_id:number){
    return this.http.get<Storage_Partition[]>(`${environment.apiUrl}/api/storage_partition/${server_id}`)
  }

}


