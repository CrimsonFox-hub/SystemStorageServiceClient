export  interface Server{

    id?: number,
    host_server_id?: number,
    model_name?: string,
    dns_name?: string,
  }
  
  export class Server_Drive {
    public get server_name():string{
        return this.servers?.dns_name || '';
    }
    public set server_name(server_name:string)	
    { }
    
      public id?: number;
      public Servers?: Server[];
      public model_name?: string;
      public server_id?: number;

      public servers?: Server| null;
}
  
  export class Server_Partition {

    public get server_dns_name():string{
        return this.servers?.dns_name || '';
    }
    public set server_dns_name(server_dns_name:string)	
    { }

      public id?: number;
      public server_id?: number;
      public server_mount_point?: string;
      public Servers?: Server[];

      public servers?: Server| null;
}
  
  export class Service {

    public get server_name():string{
        return this.servers?.dns_name || '';
    }
    public set server_name(server_name:string)	
    { }
    public get bservice_name():string{
        return this.bservice?.service_role_description || '';
    }
    public set bservice_name(bservice_name:string)	
    { }

      public id?: number;
      public server_id?: number;
      public backup_service_id?: number;
      public service_role_description?: string;
      public server_description?: string;
      public Servers?: Server[];

      public servers?: Server| null;
      public bservice?: Service| null;
}
  
  export class Service_Data {

    public get service_name():string{
        return this.services?.server_description || '';
    }
    public set service_name(service_name:string)	
    { }
    public get server_dns():string{
        return this.servers?.dns_name || '' + this.server_partitions?.server_mount_point || '';
    }
    public set server_dns(server_dns:string)
    { }
    public get storage_dns():string{
        return this.storages?.dns_name || '' + this.storage_partitions?.server_mount_point || '';
    }
    public set storage_dns(storage_dns:string)
    { }
      public serv_id?: number;
      public service_id?: number;
      public storage_partition_id?: number;
      public server_partition_id?: number;
      public Services?: Service[];
      public Servers?: Server[];
      public Storages?: Storage[];
      public Storage_Partitions?: Storage_Partition[];
      public Server_Partitions?: Server_Partition[];

      public server_partitions?: Server_Partition| null;
      public storage_partitions?: Storage_Partition | null;
      public storages?: Storage | null;
      public servers?: Server| null;
      public services?: Service| null;

  }
  
  export interface Storage {

       id?: number,
       model_name?: string,
       dns_name?: string,
  }
  
  export class Storage_Drive {
    public get storage_name():string{
        return this.storages?.dns_name || '';
    }
    public set storage_name(storage_name:string)	
    { }

      public id?: number;
      public storage_id?: number;
      public Storages?: Storage[];

      public storages?: Storage | null;
  }
  
  export class Storage_Partition {

        public get storage_dns_name():string{
            return this.storages?.dns_name || '';
        }
        public set storage_dns_name(storage_dns_name:string)	
        { }
    
        public get server_dns_name():string{
            return this.servers?.dns_name || '';
        }
        public set server_dns_name(server_dns_name:string)	
        { }

      public id?: number;
      //public server_dns_name?: string,
      //public storage_dns_name?: string,
      public storage_id?: number;
      public server_id?: number;
      public server_mount_point?: string;
      public Storages?: Storage[];
      public Servers?: Server[];

      public servers?: Server| null;
      public storages?: Storage | null;
  }