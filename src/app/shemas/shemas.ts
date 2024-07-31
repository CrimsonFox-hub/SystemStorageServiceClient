export  class Server{
  id?: number;
  host_server_id?: number;
  model_name?: string;
  serial_num?: number;
  inventory_num?: number;
  processor_quantity?: number;
  total_cores_quantity?: number;
  total_threads_quantity?: number;
  total_ram_size?: number;
  dns_name?: string;
  dns_domain?: string;
  ip_adresses?: string;
  management_ip_adresses?: string;
  rack_height?: string;
  system_name?: string;
  system_license?: string;
  system_need_to_license?: boolean;
  my_notes?: string;
  Server?: Server;
  constructor(
    id?: number, host_server_id?: number, model_name?: string, serial_num?: number, inventory_num?: number, processor_quantity?: number,
    total_cores_quantity?: number, total_threads_quantity?: number, total_ram_size?: number, dns_name?: string, dns_domain?: string,
    ip_adresses?: string, management_ip_adresses?: string, rack_height?: string, system_name?: string, system_license?: string,
    system_need_to_license?: boolean, my_notes?: string, Server?: Server)
    { this.id = id;
      this.host_server_id = host_server_id;
      this.model_name = model_name;
      this.serial_num = serial_num;
      this.inventory_num = inventory_num;
      this.processor_quantity = processor_quantity;
      this.total_cores_quantity = total_cores_quantity;
      this.total_threads_quantity = total_threads_quantity;
      this.total_ram_size = total_ram_size;
      this.dns_name = dns_name;
      this.dns_domain = dns_domain;
      this.ip_adresses = ip_adresses;
      this.management_ip_adresses = management_ip_adresses;
      this.rack_height = rack_height;
      this.system_name = system_name;
      this.system_license = system_license;
      this.system_need_to_license = system_need_to_license;
      this.my_notes = my_notes;  
      this.Server = Server;
    }
}

export class Server_Drive {
  id?: number;
  Servers?: Server;
  model_name?: string;
  server_id?: number;
  total_quantity?: string;
  drive_size?: number;
  linterface?: string;
  factor?: string;
  technology?: string;
  spindle_speed?: string;
  my_notes?: string;
  constructor(
     id?: number, Servers?: Server, model_name?: string, server_id?: number, total_quantity?: string, drive_size?: number,
     linterface?: string, factor?: string, technology?: string, spindle_speed?: string, my_notes?: string)
  { this.id = id;
    this.Servers =  Servers;
    this.model_name = model_name;
    this.server_id = server_id;
    this.total_quantity = total_quantity;
    this.drive_size = drive_size;
    this.linterface = linterface;
    this.factor = factor;
    this.technology = technology;
    this.spindle_speed = spindle_speed;
    this.my_notes = my_notes; 
  }
}

export class Server_Partition {
  id?: number;
  Server?: Server;
  server_id?: number;
  total_size?: number;
  server_mount_point?: string;
  my_notes?: string;
  constructor(
     id?: number, server_id?: number, total_size?: number, server_mount_point?: string, my_notes?: string,
     Server?: Server
             )
  { this.id = id;
    this.server_id = server_id;
    this.total_size = total_size;
    this.server_mount_point = server_mount_point;
    this.my_notes = my_notes;
    this.Server = Server;  
  }
}

export class Service {
  id?: number;
  server_id?: number;
  backup_service_id?: number;
  server_description?: string;
  server_role_description?: string;
  my_notes?: string;
  Server?: Server;
  B_Service?: Service;
  constructor(
     id?: number, server_id?: number, backup_service_id?: number, server_description?: string,
     server_role_description?: string, my_notes?: string, Servers?: Server, B_Service?: Service
             )
  { this.id = id;
    this.server_id = server_id;
    this.backup_service_id = backup_service_id;
    this.server_description = server_description;
    this.server_role_description = server_role_description;
    this.my_notes = my_notes;
    this.Server = Servers;
    this.B_Service = B_Service; 
  }
}

export class Service_Data {
  serv_id?: number;
  service_id?: number;
  storage_partition_id?: number;
  server_partition_id?: number;
  path?: string;
  my_notes?: string;
  Service?: Service[];
  Server_Partition?: Server_Partition[];
  Storage_Partition?: Storage_Partition[];
  constructor(
     service_id?: number, serv_id?: number, storage_partition_id?: number,
     server_partition_id?: number, path?: string, my_notes?: string, Service?: Service[], 
     Server_Partition?: Server_Partition[], Storage_Partition?: Storage_Partition[]
            )
  { this.serv_id = serv_id;
    this.service_id = service_id;
    this.storage_partition_id = storage_partition_id;
    this.server_partition_id = server_partition_id;
    this.path = path;
    this.my_notes = my_notes;
    this.Service = Service;
    this.Server_Partition = Server_Partition;
    this.Storage_Partition = Storage_Partition; 


  }

}

export class Storage {
  id?: number;
  model_name?: string;
  serial_num?: number;
  inventory_num?: number;
  dns_name?: string;
  dns_domain?: string;
  ip_adresses?: string;
  management_ip_adresses?: string;
  connection_type?: string;
  rack_height?: string;
  total_size?: string;
  my_notes?: string;
  constructor(
     id?: number, model_name?: string, serial_num?: number, inventory_num?: number, dns_name?: string, dns_domain?: string,
     ip_adresses?: string, management_ip_adresses?: string, connection_type?: string, rack_height?: string, total_size?: string,
     my_notes?: string
             )
  { this.id = id;
    this.model_name = model_name;
    this.serial_num = serial_num;
    this.inventory_num = inventory_num;
    this.dns_name = dns_name;
    this.dns_domain = dns_domain;
    this.ip_adresses = ip_adresses;
    this.management_ip_adresses = management_ip_adresses;
    this.connection_type = connection_type;
    this.rack_height = rack_height;
    this.total_size = total_size;
    this.my_notes = my_notes;
  }
}

export class Storage_Drive {
  id?: number;
  model_name?: string;
  storage_id?: number;
  total_quantity?: string;
  storage_size?: number;
  linterface?: string;
  factor?: string;
  technology?: string;
  spindle_speed?: number;
  my_notes?: string;
  Storages?: Storage;
  constructor(
     id?: number, model_name?: string, storage_id?: number, total_quantity?: string, storage_size?: number,
     linterface?: string, factor?: string, technology?: string, spindle_speed?: number, my_notes?: string, Storages?: Storage
             )
  {   this.id = id;
      this.model_name = model_name;
      this.storage_id = storage_id;
      this.total_quantity = total_quantity;
      this.storage_size = storage_size;
      this.linterface = linterface;
      this.factor = factor;
      this.technology = technology;
      this.spindle_speed = spindle_speed;
      this.my_notes = my_notes;
      this.Storages = Storages;
  }
}

export class Storage_Partition {
  id?: number;
  storage_id?: number;
  total_size?: number;
  server_id?: number;
  server_mount_point?: string;
  my_notes?: string;
  Server?: Server;
  Storage?: Storage;
  constructor(
     id?: number, storage_id?: number, total_size?: number, server_id?: number,
     server_mount_point?: string, my_notes?: string, Server?: Server, Storage?: Storage
             )
  {   this.id = id;
      this.storage_id = storage_id;
      this.total_size = total_size;
      this.server_id = server_id;
      this.server_mount_point = server_mount_point;
      this.my_notes = my_notes;
      this.Server = Server;
      this.Storage = Storage;
  }
}
