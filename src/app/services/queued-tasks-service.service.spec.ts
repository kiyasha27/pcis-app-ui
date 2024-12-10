import { TestBed } from '@angular/core/testing';

import { QueuedTasksServiceService } from './queued-tasks-service.service';

describe('QueuedTasksServiceService', () => {
  let service: QueuedTasksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueuedTasksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
