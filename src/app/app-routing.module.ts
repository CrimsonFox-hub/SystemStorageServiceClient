import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServerComponent} from "./sss/server/server.component";
import {ServerDriveComponent} from "./sss/server-drive/server-drive.component";
import {ServerPartitionComponent} from "./sss/server-partition/server-partition.component";
import {ServiceComponent} from "./sss/service/service.component";
import {ServiceDataComponent} from "./sss/service-data/service-data.component";
import {StorageComponent} from "./sss/storage/storage.component";
import {StorageDriveComponent} from "./sss/storage-drive/storage-drive.component";
import {StoragePartitionComponent} from "./sss/storage-partition/storage-partition.component";

const appRoutes: Routes =[
  {path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'server', component:ServerComponent},
  {path: 'server_drive', component:ServerDriveComponent},
  {path: 'server_partition', component:ServerPartitionComponent},
  {path: 'service', component:ServiceComponent},
  {path: 'service_data', component:ServiceDataComponent},
  {path: 'storage', component:StorageComponent},
  {path: 'storage_drive', component:StorageDriveComponent},
  {path: 'storage_partition', component:StoragePartitionComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
