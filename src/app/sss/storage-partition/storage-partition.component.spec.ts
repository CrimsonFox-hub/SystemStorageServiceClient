import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePartitionComponent } from './storage-partition.component';

describe('StoragePartitionComponent', () => {
  let component: StoragePartitionComponent;
  let fixture: ComponentFixture<StoragePartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoragePartitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
