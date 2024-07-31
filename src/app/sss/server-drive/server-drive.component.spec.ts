import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDriveComponent } from './server-drive.component';

describe('ServerDriveComponent', () => {
  let component: ServerDriveComponent;
  let fixture: ComponentFixture<ServerDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
