import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedTasksComponent } from './queued-tasks.component';

describe('QueuedTasksComponent', () => {
  let component: QueuedTasksComponent;
  let fixture: ComponentFixture<QueuedTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueuedTasksComponent]
    });
    fixture = TestBed.createComponent(QueuedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
