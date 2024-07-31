import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerPartitionComponent } from './server-partition.component';

describe('ServerPartitionComponent', () => {
  let component: ServerPartitionComponent;
  let fixture: ComponentFixture<ServerPartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerPartitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerPartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
